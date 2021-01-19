import { RoomComponent } from './../room/room.component';
import { ListComponent } from './../aluno/list/list.component';
import { DashboardComponent } from './dashboard.component';
import { Routes } from '@angular/router';

export const DashBoardRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'students',
    component: ListComponent
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
