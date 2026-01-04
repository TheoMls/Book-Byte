import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { Courses } from './pages/courses/courses';
import { About } from './pages/about/about';
import { Books } from './pages/books/books';
import { CourseDetails } from './pages/course-details/course-details';

export const routes: Routes = [
    { path: '', component: Home },
    { path: 'register', component: Register },
    { path: 'courses', component: Courses },
    { path: 'about', component: About },
    { path: 'books', component: Books },
    { path: 'course-details/:id', component: CourseDetails },
];