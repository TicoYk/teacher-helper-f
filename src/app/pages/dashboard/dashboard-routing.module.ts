import { StudentComponent } from '@pages/student';
import { RoomComponent } from '@pages/room';
import { DashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';

export const DashBoardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'students',
    component: StudentComponent
  },
  {
    path: 'rooms',
    component: RoomComponent
  },
  {
    path: 'alunos',
    redirectTo: 'students'
  },
  {
    path: 'salas',
    redirectTo: 'rooms'
  }
];
