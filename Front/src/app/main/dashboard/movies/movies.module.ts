import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MovieListComponent} from './movie-list/movie-list.component';
import {MovieAddComponent} from './movie-add/movie-add.component';
import {MovieEditComponent} from './movie-edit/movie-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {CoreCommonModule} from 'src/@core/common.module';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CorePipesModule} from 'src/@core/pipes/pipes.module';
import {CoreDirectivesModule} from 'src/@core/directives/directives';
import {CoreSidebarModule} from 'src/@core/components';
import {FileUploadModule} from 'ng2-file-upload';
import {ArtistService} from '../../../service/artist.service';
import {NationalityService} from '../../../service/nationality.service';
import {MovieGenreService} from '../../../service/moviegenre.service';
import {MovieService} from 'src/app/service/movie.service';
import {NgSelectModule} from '@ng-select/ng-select';
import {NewArtistSidebarComponent} from './new-artist-sidebar/new-artist-sidebar.component';
import {ContentHeaderModule} from "../../../layout/components/content-header/content-header.module";
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

const routes: Routes = [
  {
    path: 'list',
    component: MovieListComponent,
  },
  {
    path: 'add',
    component: MovieAddComponent,
  },
  {
    path: 'edit/:id',
    component: MovieEditComponent,
    data: {path: 'edit/:id'},
  },
  {
    path: '',
    redirectTo: 'dashboard/movies/list',
    pathMatch: 'full',
  },
];

@NgModule({
  declarations: [
    MovieListComponent,
    MovieAddComponent,
    MovieEditComponent,
    NewArtistSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    CoreCommonModule,
    FormsModule,
    NgbModule,
    NgSelectModule,
    Ng2FlatpickrModule,
    NgxDatatableModule,
    CorePipesModule,
    CoreDirectivesModule,
    CoreSidebarModule,
    FileUploadModule,
    ContentHeaderModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    ArtistService,
    NationalityService,
    MovieGenreService,
    MovieService,
  ],
  bootstrap: [MovieListComponent],
})
export class MoviesModule {
}
