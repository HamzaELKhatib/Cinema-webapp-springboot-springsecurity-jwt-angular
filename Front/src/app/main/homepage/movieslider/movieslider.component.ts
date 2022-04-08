import { Component, OnInit } from '@angular/core';
import { CAROUSEL_DATA_ITEMS } from '../../../../assets/carousel.const';
import { ICarouselItem } from '../carousel/Icarousel-item.metadata';
import {SliderService} from "../../../service/slider.service";

@Component({
  selector: 'app-movieslider',
  templateUrl: './movieslider.component.html',
  styleUrls: ['./movieslider.component.css'],
})
export class MoviesliderComponent implements OnInit {
  public carouselData ;

  constructor(private _sliderService:SliderService) {}

  ngOnInit(): void {
    this.getAll()
  }
  getAll(){
    this._sliderService.getAll().subscribe(
      (res)=>{
        this.carouselData=res
      },
      (error)=>{
        alert(error)
      }
    )
  }
}
