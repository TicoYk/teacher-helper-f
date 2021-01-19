import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { RoomService } from './../services/room.service';
import { FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { Component, ViewChild, NgModule } from '@angular/core';
import Room from '../models/room.model';

@NgModule({
  providers: [
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ]
})

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = ['id', 'name', 'columns'];
  dataSource: MatTableDataSource<Room> = new MatTableDataSource<Room>();
  matcher = new MyErrorStateMatcher();

  roomFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3)
  ]);

  constructor(private roomService: RoomService){
    this.roomService.getRooms().subscribe(res => {
      this.dataSource = new MatTableDataSource<Room>(res);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  register(): void{
    const name: string = this.roomFormControl.value;
    this.roomService.registerRoom(new Room(name)).subscribe( res => {
      const data = this.dataSource.data;
      data.push(res);
      this.dataSource.data = data;
      alert('Sala ' + name + ' cadastrada com sucesso!');
    });
  }

  studentsCount(room: Room): number{
    return this.roomService.studentsCounts(room);
  }
}
