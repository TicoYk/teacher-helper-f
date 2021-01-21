import { ClassroomComponent } from '@pages/classroom/classroom.component';
import { RoomComponent } from './room/room.component';
import { Routes } from '@angular/router';
import { StudentComponent } from './student/student.component';

export const PagesRoutes: Routes = [
  {
    path: 'students',
    component: StudentComponent
  },
  {
    path: 'rooms',
    component: RoomComponent
  },
  {
    path: 'classroom',
    component: ClassroomComponent
  },
  {
    path: 'alunos',
    redirectTo: 'students'
  },
  {
    path: 'salas',
    redirectTo: 'rooms'
  },
  {
    path: 'turma',
    redirectTo: 'classroom'
  }
];
