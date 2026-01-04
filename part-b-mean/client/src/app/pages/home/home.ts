import { Component, OnInit, viewChild, ElementRef, AfterViewInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  private http = inject(HttpClient);
  suggestedBooks = signal<any[]>([]);

  categories = [
    { id: 'cs', name: 'Computer Science' },
    { id: 'business', name: 'Business' },
    { id: 'design', name: 'Design' },
    { id: 'marketing', name: 'Marketing' }
  ];

  ngOnInit() {
    // TODO: load random books from backend API
    //this.http.get<any[]>('/api/books/random?count=6').subscribe({
    //  next: (data) => {
    //    this.suggestedBooks.set(data);
    //  },
    //  error: (err) => {
    //    console.error('Error loading books:', err);
    //  }
    //});
    // TODO: load categories from backend API

    const dummyBooks = [
      { id: 1, title: 'Book 1', image: 'assets/img/book1.png' },
      { id: 2, title: 'Book 2', image: 'assets/img/book1.png' },
      { id: 3, title: 'Book 3', image: 'assets/img/book1.png' },
      { id: 4, title: 'Book 4', image: 'assets/img/book1.png' },
      { id: 5, title: 'Book 5', image: 'assets/img/book1.png' },
      { id: 6, title: 'Book 6', image: 'assets/img/book1.png' },
    ];
    this.suggestedBooks.set(dummyBooks);
  }

  readonly horizontalMenu = viewChild<ElementRef>('horizontalMenuContainer');

  ngAfterViewInit() {

    const horizontal = this.horizontalMenu()?.nativeElement;

    if (horizontal) {
      horizontal.addEventListener('wheel', (e: WheelEvent) => {
        if (e.deltaY === 0) return;

        e.preventDefault();

        horizontal.scrollLeft += e.deltaY / 4;
      }, { passive: false });
    }
  }
}