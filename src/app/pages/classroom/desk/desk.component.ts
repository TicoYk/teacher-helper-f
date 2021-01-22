import Desk from '@models/desk.model';
import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-desk',
  templateUrl: './desk.component.html',
  styleUrls: ['./desk.component.css']
})
export class DeskComponent implements OnInit {

  @Output() onTestEmit = new EventEmitter();

  @Input() posX = 0;
  @Input() posY = 0;
  @Input() desk: Desk = new Desk();

  constructor() { }

  ngOnInit(): void {
  }

  public testEmit(): void {
    this.onTestEmit.emit("testing");
  }

}
