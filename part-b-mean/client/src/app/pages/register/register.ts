import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {
  private fb = inject(FormBuilder);
  private apiService = inject(ApiService);
  private router = inject(Router);

  // State Signals
  currentStep = signal(1);
  passwordVisible = signal(false);
  isLoginMode = signal(false);
  categories = signal<any[]>([]);

  // Form Definition
  registerForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), this.passwordComplexityValidator]],
    confirmPassword: ['', [Validators.required]],
    fname: ['', Validators.required],
    lname: ['', Validators.required],
    dateOfBirth: ['', [Validators.required, this.ageValidator]],
    skillLevel: ['1', Validators.required],
    categoriesInterested: this.fb.control<string[]>([], { nonNullable: true }),
    terms: [false, Validators.requiredTrue]
  }, { validators: this.passwordMatchValidator });

  ngOnInit() {
    this.apiService.getCategories().subscribe({
      next: (res) => {
        if (res.success) this.categories.set(res.data);
      },
      error: (err) => console.error('Error loading categories:', err)
    });
  }

  get f() { return this.registerForm.controls; }

  // Navigation Logic
  nextStep() {
    const step = this.currentStep();

    if (step === 1) {
      if (this.f.email.invalid) return this.f.email.markAsTouched();

      const email = this.f.email.value;

      this.apiService.checkEmail(email!).subscribe({
        next: (res: any) => {
          if (res.exists) {
            // Switch to Login Mode
            this.isLoginMode.set(true);
            this.currentStep.set(2);
          } else {
            // Registration Mode
            this.isLoginMode.set(false);
            this.currentStep.set(2);
          }
        },
        error: (err) => console.error('API Error:', err)
      });
      return;
    }

    if (step === 2 && !this.isLoginMode()) {
      const passValid = this.f.password.valid && this.f.confirmPassword.valid && !this.registerForm.errors?.['mismatch'];
      if (!passValid) {
        this.f.password.markAsTouched();
        this.f.confirmPassword.markAsTouched();
        return;
      }
    }

    if (step === 3) {
      if (this.f.fname.invalid || this.f.lname.invalid || this.f.dateOfBirth.invalid) {
        this.f.fname.markAsTouched();
        this.f.lname.markAsTouched();
        this.f.dateOfBirth.markAsTouched();
        return;
      }
    }

    this.currentStep.update(s => s + 1);
  }

  prevStep() {
    this.currentStep.update(s => s - 1);
  }

  onLogin() {
    const email = this.f.email.value;
    const password = this.f.password.value;

    if (!email || !password) return;

    this.apiService.login({ email, password }).subscribe({
      next: (res) => {
        console.log('Login success', res);
        this.router.navigate(['/']);
      },
      error: (err) => alert('Login failed: ' + (err.error?.message || 'Invalid credentials'))
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible.update(v => !v);
  }

  onCategoryChange(catId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    const currentCats = this.f.categoriesInterested.value || [];

    if (isChecked) {
      this.f.categoriesInterested.setValue([...currentCats, catId]);
    } else {
      this.f.categoriesInterested.setValue(currentCats.filter(id => id !== catId));
    }
  }

  passwordComplexityValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value || '';
    const hasUpper = /[A-Z]/.test(value);
    const hasLower = /[a-z]/.test(value);
    const hasNum = /\d/.test(value);
    return (hasUpper && hasLower && hasNum) ? null : { complexity: true };
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return pass === confirm ? null : { mismatch: true };
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;
    const dob = new Date(control.value).getTime();
    const age = Date.now() - dob;
    const msInYear = 365.25 * 24 * 60 * 60 * 1000;
    if (age < 16 * msInYear) return { tooYoung: true };
    if (age > 120 * msInYear) return { tooOld: true };
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const payload = {
        ...this.registerForm.value,
        skillLevel: Number(this.registerForm.value.skillLevel)
      };
      this.apiService.register(payload).subscribe({
        next: (res) => this.router.navigate(['/']),
        error: (err) => alert('Registration failed: ' + err.message)
      });
    }
  }

  get selectedCategoryNames() {
    const ids = this.f.categoriesInterested.value || [];
    return this.categories()
      .filter(c => ids.includes(c._id))
      .map(c => c.name)
      .join(', ') || 'None selected';
  }

  get skillLevelLabel() {
    const level = this.f.skillLevel.value;
    if (level == '1') return 'Beginner';
    if (level == '2') return 'Intermediate';
    if (level == '3') return 'Advanced';
    return 'Unknown';
  }
}