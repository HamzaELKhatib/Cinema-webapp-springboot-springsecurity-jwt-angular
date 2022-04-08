import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-greeting-section',
  templateUrl: './greeting-section.component.html',
  styleUrls: ['./greeting-section.component.css'],
})
export class GreetingSectionComponent implements OnInit {
  @Output() onPlusClick = new EventEmitter<boolean>();

  Press() {
    this.onPlusClick.emit(true);
  }
  constructor() {}

  ngOnInit(): void {}
}
