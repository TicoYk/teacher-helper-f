import Student from '@models/student.model';
import Desk from '@models/desk.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.scss']
})
export class DeskComponent implements OnInit {

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onDeskChange = new EventEmitter<Desk>();

  @Input() posX = 0;
  @Input() posY = 0;
  @Input() desk: Desk = new Desk();
  @Input() nonChoosenStudents: Student[] = [];

  constructor() { }

  ngOnInit(): void {
  }

  onSelectChange(value: number): void {
    if (typeof this.nonChoosenStudents[value] === undefined) {
      alert('Aluno não encontrado!');
      return;
    }
    this.nonChoosenStudents.forEach( student => {
      if( student.id === value ){
        this.desk.student = student;
      }
    });
    this.emitDeskChange();
  }

  public emitDeskChange(): void {
    this.onDeskChange.emit(this.desk);
  }

}
