import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '../../../../assets/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css'],
})
export class HomepageComponent implements OnInit {
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;

  constructor() {}

  ngOnInit(): void {}
}
