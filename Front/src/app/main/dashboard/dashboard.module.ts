import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';

import { CoreCommonModule } from 'src/@core/common.module';
import { ContentHeaderModule } from 'src/app/layout/components/content-header/content-header.module';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { LayoutModule } from '../../layout/layout.module';
import {
  CoreSidebarModule,
  CoreThemeCustomizerModule,
} from '../../../@core/components';
import { AnalyticsComponent } from './analytics/analytics.component';
import {NgApexchartsModule} from "ng-apexcharts";
import {SliderListComponent} from "./carousel/slider-list.component";
import {Ng2FlatpickrModule} from "ng2-flatpickr";
import {NgxDatatableModule} from "@swimlane/ngx-datatable";
import {CorePipesModule} from "../../../@core/pipes/pipes.module";
import {CoreDirectivesModule} from "../../../@core/directives/directives";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";
import {NewSliderSidebarComponent} from "./carousel/new-carousel-sidebar/new-slider-sidebar.component";
import {FileUploadModule} from "ng2-file-upload";


const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'movies',
        loadChildren: () =>
          import('./movies/movies.module').then((m) => m.MoviesModule),
      },
      {
        path: 'statistics',
        component: AnalyticsComponent,
      },
      {
        path: 'carousel',
        component: SliderListComponent,
      },
      {
        path: 'artists',
        loadChildren: () => import('./artists/artists.module').then(m => m.ArtistsModule)
      },
      {
        path: 'halls',
        loadChildren: () => import('./halls/hall.module').then(m => m.HallModule)
      },
      {
        path: 'projections',
        loadChildren: () => import('./projections/projection.module').then(m => m.ProjectionModule)
      },
      {
        path: '',
        component: AnalyticsComponent,
      },
    ],
  },
];


@NgModule({
  declarations: [DashboardComponent, AnalyticsComponent, NewSliderSidebarComponent, SliderListComponent],
  imports: [
    CommonModule,
    ContentHeaderModule,
    RouterModule.forChild(routes),
    FormsModule,
    LayoutModule,
    NgbModule,
    CoreCommonModule,
    CoreSidebarModule,
    CoreThemeCustomizerModule, FileUploadModule,
    NgApexchartsModule, NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    SweetAlert2Module.forRoot()
  ],
})
export class DashboardModule {}
