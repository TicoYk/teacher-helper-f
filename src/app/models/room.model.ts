import Desk from './desk.model';
export default class Room {

  id?: number;
  name?: string;
  rows?: number;
  columns?: number;
  desks: Desk[] = [];

  constructor(name: string){
    this.name = name;
  }

}
