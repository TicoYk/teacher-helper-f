import { StudentService } from '@services/student.service';
import Student from '@models/student.model';
import Room from '@models/room.model';
import { RoomService } from '@services/room.service';
import { Component, OnInit } from '@angular/core';
import Desk from '@models/desk.model';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss']
})
export class ClassroomComponent implements OnInit {

  rooms: Room[] = [];
  choosenRoom: Room = new Room();
  choosenRoomIndex?: number;
  desks: Desk[][] = [];
  students: Student[] = [];
  nonChoosenStudents: Student[] = [];

  roomLayout = {
    width: '0px',
    height: '0px'
  };

  constructor(private roomService: RoomService, private studentService: StudentService) {
    this.roomService.getRooms().subscribe( res => {
      this.rooms = res;
    });
    this.studentService.getStudents().subscribe(res => {
      this.students = res;
    });
  }

  ngOnInit(): void {
  }

  onSelectChange(value: number): void {
    if (typeof this.rooms[value] === undefined) {
      alert('Sala não encontrada!');
      return;
    }
    this.choosenRoomIndex = value;
    this.choosenRoom = this.rooms[value];
    this.updateNonChoosenStudents();
    this.mountRoomLayout();
  }

  mountRoomLayout(): void{
    if (this.choosenRoom === undefined){
      alert('Algum problema ocorreu!');
      return;
    }
    const room = this.choosenRoom;
    this.desks = [];
    // tslint:disable-next-line: no-unused-expression
    room.rows === null || room.rows === undefined ? room.rows = 0 : null;
    // tslint:disable-next-line: no-unused-expression
    room.columns === null || room.columns === undefined ? room.columns = 0 : null;
    this.choosenRoom = room;

    this.roomLayout.height = (100 * room.rows) + 'px';

    this.roomLayout.width = (200 * room.columns) + 'px';

    for (let x = 0; x < room.rows; x++){
      const deskLine: Desk[] = [];
      for (let y = 0; y < room.columns; y++){
        deskLine.push(new Desk(x, y));
      }
      this.desks.push(deskLine);
    }
    this.populateRoom();
    this.updateNonChoosenStudents();
  }

  changeColumnValue(value: number): void {
    if (this.choosenRoom.columns !== undefined){
      this.choosenRoom.columns += value;
    }
    this.mountRoomLayout();
  }

  changeRowValue(value: number): void {
    if (this.choosenRoom.rows !== undefined){
      this.choosenRoom.rows += value;
    }
    this.mountRoomLayout();
  }

  onDeskChange(newDesk: Desk): void {
    let found = false;
    this.choosenRoom.desks.forEach( (desk, index) => {
      if ( desk.posX === newDesk.posX && desk.posY === newDesk.posY ){
        this.choosenRoom.desks[index] = newDesk;
        found = true;
      }
    });
    if (!found) {
      this.choosenRoom.desks.push(newDesk);
    }
    this.updateNonChoosenStudents();
  }

  updateRoom(): void {
    this.roomService.putRoom(this.choosenRoom).subscribe(res => {
      this.rooms.forEach( (room, index) => {
        if ( room.id === res.id ){
          this.rooms[index] = res;
        }
      });
    });
  }

  updateNonChoosenStudents(): void{
    this.nonChoosenStudents = [...this.students];
    this.choosenRoom.desks.forEach( desk => {
      if ( desk.student !== undefined){
        this.nonChoosenStudents.forEach( (student, index) => {
          if (desk.student?.id === student.id){
            this.nonChoosenStudents.splice(index, 1);
          }
        });
      }
    });
  }

  populateRoom(): void{
    this.choosenRoom.desks.forEach( desk => {
      if(desk.posX !== undefined && desk.posY !== undefined){
        this.desks[desk.posX][desk.posY] = desk;
      }
    });
  }
}
