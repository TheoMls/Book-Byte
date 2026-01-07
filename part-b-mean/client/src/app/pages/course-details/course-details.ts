import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './course-details.html',
  styleUrl: './course-details.css',
})
export class CourseDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private apiService = inject(ApiService);

  course = signal<any>(null);

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.apiService.getCourseById(id).subscribe({
        next: (res) => {
          if (res.success) {
            this.course.set(res.data);
            console.log(res.data)
          }
        },
        error: (err) => console.error('Error fetching course details:', err)
      });
    }
  }

  // TODO: Function to handle enrollment
  onEnroll() {
  }
}