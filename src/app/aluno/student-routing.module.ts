import { ListComponent } from './list/list.component';
import { Routes } from '@angular/router';

export const StudentRoutes: Routes = [
  {
    path: 'students',
    component: ListComponent
  },
  {
    path: 'alunos',
    redirectTo: 'students'
  }
];
