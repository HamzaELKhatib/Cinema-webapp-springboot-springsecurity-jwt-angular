import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast
import { CoreModule } from 'src/@core/core.module';
import { CoreCommonModule } from 'src/@core/common.module';
import {
  CoreSidebarModule,
  CoreThemeCustomizerModule,
} from 'src/@core/components';
import { coreConfig } from 'src/app/app-config';
import { AppComponent } from 'src/app/app.component';
import { AuthenticationModule } from './main/pages/authentication/authentication.module';
import { NotificationModule } from './layout/components/notification.module';
import { FormsModule } from '@angular/forms';
import { NotificationService } from './service/notification.service';
import { AuthInterceptor } from './auth/helpers/auth.interceptor';
import { EventEmitterService } from './service/event-emitter.service';
import { AuthenticationGuard } from './auth/helpers/authentication.guard';
import { AuthenticationService } from './auth/service/authentication.service';
import { UserService } from './service/user.service';
import { ArtistService } from './service/artist.service';
import { NationalityService } from './service/nationality.service';
import { MovieGenreService } from './service/moviegenre.service';
import { MovieService } from './service/movie.service';
import {AnalyticsComponent} from "./main/dashboard/analytics/analytics.component";
import {MovieDetailComponent} from "./main/homepage/movie-detail/movie-detail.component";



const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./main/homepage/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./main/pages/pages.module').then((m) => m.PagesModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./main/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'corrected',
    }),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NotificationModule,
    NgbModule,
    TranslateModule.forRoot(),
    ToastrModule.forRoot(),
    CoreModule.forRoot(coreConfig),
    CoreSidebarModule,
    CoreThemeCustomizerModule,
    AuthenticationModule,
  ],
  providers: [
    NotificationService,
    EventEmitterService,
    AuthenticationGuard,
    AuthenticationService,
    UserService,
    ArtistService,
    NationalityService,
    MovieGenreService,
    MovieService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
