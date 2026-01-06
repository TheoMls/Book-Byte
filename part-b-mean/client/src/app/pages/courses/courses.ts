import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './courses.html',
  styleUrl: './courses.css',
})
export class Courses implements OnInit {
  private apiService = inject(ApiService);
  coursesList = signal<any[]>([]);

  ngOnInit() {
    this.apiService.getCourses().subscribe({
      next: (res) => {
        if (res.success) this.coursesList.set(res.data);
      },
      error: (err) => console.error(err)
    });
  }
}