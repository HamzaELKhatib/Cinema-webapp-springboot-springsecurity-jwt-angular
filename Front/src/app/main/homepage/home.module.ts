import {CommonModule} from '@angular/common'
import {NgModule} from '@angular/core'
import {FormsModule} from '@angular/forms'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {NgSelectModule} from '@ng-select/ng-select'

import {CoreCommonModule} from 'src/@core/common.module'
import {ContentHeaderModule} from 'src/app/layout/components/content-header/content-header.module'
import {RouterModule, Routes} from "@angular/router";
import {MiscellaneousModule} from "../pages/miscellaneous/miscellaneous.module";
import {MovieSearchComponent} from "./movie-search/movie-search.component";
import {HomepageComponent} from "./home/homepage.component";
import {ActorSearchComponent} from "./actor-search/actor-search.component";
import {MovieDetailComponent} from "./movie-detail/movie-detail.component";
import {HomeComponent} from "./home.component";
import {NavbarComponent} from "../../layout/components/home-navbar/navbar.component";
import {NotificationModule} from "../../layout/components/notification.module";
import {CarouselComponent} from "./carousel/carousel.component";
import {GreetingSectionComponent} from "./greeting-section/greeting-section.component";
import {MoviesliderComponent} from "./movieslider/movieslider.component";
import {ProjectionModule} from "../dashboard/projections/projection.module";
import {ActorDetailComponent} from "./actor-detail/actor-detail.component";
import {LoginComponent} from "../pages/authentication/login/login.component";
import {RegisterComponent} from "../pages/authentication/register/register.component";
import {ProjectionSearchComponent} from "./projection-search/projection-search.component";
import { DatePipe } from '@angular/common';

const routes: Routes = [
  { path: '', component: HomeComponent,
    children:[
      { path: '', component: HomepageComponent },
      { path: 'search', component: MovieSearchComponent },
      { path: 'movies/:id', component: MovieDetailComponent },
      { path: 'actors/all', component: ActorSearchComponent },
      { path: 'artists/:id', component: ActorDetailComponent },
      { path: 'movies', component: MovieSearchComponent },
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'projections', component: ProjectionSearchComponent },
      { path: 'actors', component: ActorSearchComponent }
    ]},

]

@NgModule({
  declarations: [HomeComponent, NavbarComponent,
    GreetingSectionComponent,
    MovieSearchComponent,
    MovieDetailComponent,
    ActorSearchComponent,
    HomepageComponent,
    NavbarComponent,
    CarouselComponent,
    ProjectionSearchComponent,
    MoviesliderComponent,
    ActorDetailComponent],
    imports: [
        CommonModule,
        CoreCommonModule,
        ContentHeaderModule,
        RouterModule.forChild(routes),
        NgbModule,
        NgSelectModule,
        FormsModule,
        MiscellaneousModule, NotificationModule, ProjectionModule
    ],
  providers:[DatePipe],
  bootstrap:[HomeComponent]
})
export class HomeModule {
}
