import {HttpErrorResponse} from '@angular/common/http';
import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Subject} from 'rxjs';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {CoreConfigService} from 'src/@core/services/config.service';
import {Genre} from 'src/app/interface/genre';
import {Movie} from 'src/app/interface/movie';
import {Nationality} from 'src/app/interface/nationality';
import {MovieService} from 'src/app/service/movie.service';
import {MovieGenreService} from 'src/app/service/moviegenre.service';
import {NationalityService} from 'src/app/service/nationality.service';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';
import Swal from "sweetalert2";

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MovieListComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows: Movie[];
  public selectedOption = 10;
  public temp = [];
  public previousGenreFilter = 0;
  public previousNationalityFilter = 0;
  public ColumnMode = ColumnMode;

  public nationalities;
  public genres;

  public selectedNationality;
  public selectedGenre;
  public searchValue = '';
  @ViewChild(DatatableComponent) table: DatatableComponent;
  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _movieService: MovieService,
    private _nationalityService: NationalityService,
    private _genresService: MovieGenreService
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedGenre = 0;
    this.selectedNationality = 0;

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  filterByGenre(event) {
    const filter = event ? event.id : 0;
    this.previousGenreFilter = filter;
    this.temp = this.filterRows(this.previousNationalityFilter, filter);
    this.rows = this.temp;
  }

  filterByNationality(event) {
    const filter = event ? event.id : 0;
    this.previousNationalityFilter = filter;
    this.temp = this.filterRows(filter, this.previousGenreFilter);
    this.rows = this.temp;
  }

  filterRows(nationalityFilter, genreFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    return this.tempData.filter((row) => {
      const isPartialGenreMatch =
        row.genre.id == genreFilter || !genreFilter || genreFilter == 0;

      const isPartialNationalityMatch =
        row.nationality.id == nationalityFilter ||
        !nationalityFilter ||
        nationalityFilter == 0;

      return isPartialGenreMatch && isPartialNationalityMatch;
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getGenres();
    this.getNationalities();
  }

  public getAll(): void {
    this._movieService.getAllMovies().subscribe(
      (response: Movie[]) => {
        this.rows = response;
        this.tempData = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  getNationalities() {
    this._nationalityService.getAll().subscribe(
      (response: Nationality[]) => {
        response.unshift({id: 0, title: 'All'});
        this.nationalities = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  getGenres() {
    this._genresService.getAllMovieGenres().subscribe(
      (response: Genre[]) => {
        response.unshift({id: 0, title: 'All'});
        this.genres = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  deleteMovie(id) {
    this._movieService.deleteMovie(id).subscribe(
      () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Movie has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
        this.getAll()

      }
    )


  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  ConfirmColorOpen(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    }).then((result) => {
      if (result.value) {
        this.deleteMovie(id)
      }
    });
  }
}
