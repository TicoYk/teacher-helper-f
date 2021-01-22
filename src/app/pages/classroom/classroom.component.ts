import Room from '@models/room.model';
import { RoomService } from './../../services/room.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  rooms: Room[] = [];
  choosenRoom: Room = new Room();

  constructor(private roomService: RoomService) {
    this.roomService.getRooms().subscribe( res => {
      this.rooms = res;
    });
  }

  ngOnInit(): void {
  }

  onSelectChange(value: number){
    this.choosenRoom = this.rooms[value];
    console.log(this.choosenRoom);
  }
}
