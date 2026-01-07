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
  isFilterMenuOpen = false;

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
      },
      error: (err) => console.error('Error courses:', err)
    });
  }

  // UI Handlers

  toggleFilters() {
    this.isFilterMenuOpen = !this.isFilterMenuOpen;
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
    const cat = this.categories().find(c => c.id === id);
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
    this.isFilterMenuOpen = false;
  }

  clearFilters() {
    this.searchQuery = '';
    this.maxDuration = 20;
    this.maxDifficulty = 3;
    this.enableDuration = false;
    this.enableDifficulty = false;
    this.selectedCategories.clear();
    
    this.router.navigate(['/courses']);
    this.isFilterMenuOpen = false;
  }
}