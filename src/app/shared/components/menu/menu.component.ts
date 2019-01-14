import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ap-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  showing = false;

  constructor() { }

  toggle() {
    this.showing = !this.showing;
  }

  ngOnInit() {
  }

}
