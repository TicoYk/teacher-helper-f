import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Student from '@models/student.model';
import { Observable } from 'rxjs';

@Injectable()
export class StudentService {

  readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = '/api/students';
  }

  registerStudent(student: Student): Observable<Student> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.post<Student>(this.apiURL, student, {headers});
  }

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiURL}`);
  }
}
