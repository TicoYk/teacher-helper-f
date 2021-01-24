import Student from './student.model';

export default class Desk {

  id?: number;
  posX?: number;
  posY?: number;
  student?: Student;

  constructor(
    posX?: number,
    posY?: number,
    student?: Student,
  ){
    this.posX = posX;
    this.posY = posY;
    this.student = student;
  }

}
