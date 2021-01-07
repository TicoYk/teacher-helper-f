import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Student from '../aluno/shared/student.model';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {

  readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = 'http://localhost:3000/students';
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiURL}`);
  }
}
