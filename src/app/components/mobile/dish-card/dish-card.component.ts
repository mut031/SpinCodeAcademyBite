import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dish-card',
  templateUrl: './dish-card.component.html',
  styleUrls: ['./dish-card.component.scss'],
})
export class DishCardComponent implements OnInit {
  @Input() img: string;
  @Input() name: string;
  @Input() description: string;
  @Input() orderDay: string;
  @Input() dishSelected: boolean;
  @Input() button: boolean;

  randomImg: string;

  constructor() { }

  ngOnInit() {
    this.randomImg = String(Math.floor(Math.random() * 5) + 1);
  }

}
