import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  private apiService = inject(ApiService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  // Data Signals
  coursesList = signal<any[]>([]);
  categories = signal<any[]>([]);

  // Filter State
  searchQuery = '';
  maxDuration = 20;
  maxDifficulty = 3;
  enableDuration = false;
  enableDifficulty = false;

  // Use a Set to track multiple selected categories
  selectedCategories = new Set<string>();

  // UI State
  isFilterMenuOpen = signal(false);

  // Helper for rendering badges (ported from your old JS)
  difficultyMap: any = {
    1: { label: "Beginner", color: "#28a745" },
    2: { label: "Intermediate", color: "#fd7e14" },
    3: { label: "Advanced", color: "#dc3545" }
  };

  ngOnInit() {
    this.fetchCategories();

    this.route.queryParams.subscribe(params => {
      // Restore state from URL
      if (params['category']) {
        const cats = Array.isArray(params['category']) ? params['category'] : [params['category']];
        cats.forEach((c: string) => this.selectedCategories.add(c));
      }
      if (params['title']) this.searchQuery = params['title'];

      this.fetchCourses(params);
    });
  }

  fetchCategories() {
    this.apiService.getCategories().subscribe({
      next: (res) => {
        if (res.success) this.categories.set(res.data);
      },
      error: (err) => console.error('Error categories:', err)
    });
  }

  fetchCourses(filters: any) {
    this.apiService.getCourses(filters).subscribe({
      next: (res) => {
        if (res.success) this.coursesList.set(res.data);
        if (Object.keys(filters).length === 0) {
          this.updateCoursesFilters();
        }
      },
      error: (err) => console.error('Error courses:', err)
    });
  }

  // UI Handlers
  toggleFilters() {
    const newFilterState = !this.isFilterMenuOpen();
    this.isFilterMenuOpen.set(newFilterState);

    if (newFilterState) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }
  closeFilters() {
    this.isFilterMenuOpen.set(false);
    document.body.classList.remove("no-scroll");
  }

  updateCategory(categoryId: string, event: Event) {
    const isChecked = (event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.selectedCategories.add(categoryId);
    } else {
      this.selectedCategories.delete(categoryId);
    }
  }

  getCategoryName(id: string): string {
    const cat = this.categories().find(c => c._id === id);
    return cat ? cat.name : id;
  }

  getDifficultyInfo(level: number) {
    return this.difficultyMap[level] || { label: "Unknown", color: "#333" };
  }

  applyFilters() {
    const queryParams: any = {};

    if (this.searchQuery) queryParams.title = this.searchQuery;

    if (this.selectedCategories.size > 0) {
      queryParams.category = Array.from(this.selectedCategories);
    }

    if (this.enableDuration) queryParams.maxDuration = this.maxDuration;
    if (this.enableDifficulty) queryParams.maxDifficulty = this.maxDifficulty;

    this.router.navigate(['/courses'], { queryParams });
    this.closeFilters();
  }

  resetFilters() {
    this.searchQuery = '';
    this.updateCoursesFilters();
    this.enableDuration = false;
    this.enableDifficulty = false;
    this.selectedCategories.clear();
  }

  updateCoursesFilters() {
    if (this.coursesList().length === 0) return;
    this.maxDuration = this.coursesList().reduce((max, course) => Math.max(max, course.duration), 0);
    this.maxDifficulty = this.coursesList().reduce((max, course) => Math.max(max, course.difficulty), 0);
  }

  clearFilters() {
    this.resetFilters();
    this.router.navigate(['/courses']);
    this.closeFilters();
  }
}