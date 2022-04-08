import { Component } from '@angular/core';
import { ICarouselItem } from './carousel/Icarousel-item.metadata';
import { CAROUSEL_DATA_ITEMS } from '../../../assets/carousel.const';
import { AuthenticationService } from '../../auth/service/authentication.service';

@Component({
  selector: 'app-home-root',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public carouselData: ICarouselItem[] = CAROUSEL_DATA_ITEMS;
  title = 'cinema-app';
  display = false;
  authentication: AuthenticationService;
  onPress() {
    this.display = true;
    /*if you want the component to show and hide on click pressed, use
    use this line
    this.display = !this.display;*/
  }
}
