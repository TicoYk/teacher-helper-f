import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Desk from '../models/desk.model';
import Room from '../models/room.model';

@Injectable()
export class RoomService {

  readonly apiURL: string;

  constructor(private http: HttpClient) {
    this.apiURL = '/api/rooms';
  }

  registerRoom(room: Room): Observable<Room> {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    return this.http.post<Room>(this.apiURL, room, {headers});
  }

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(`${this.apiURL}`);
  }

  studentsCounts(room: Room): number {
    let count = 0;
    if (room.desks === undefined){
      return count;
    }
    room.desks.forEach( desk => {
      if(desk.student !== null){
        count++;
      }
    });
    return count;
  }

}
