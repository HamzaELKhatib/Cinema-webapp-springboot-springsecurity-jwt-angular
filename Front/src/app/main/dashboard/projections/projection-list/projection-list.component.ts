import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { CoreSidebarService } from 'src/@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from 'src/@core/services/config.service';
import { Artist } from 'src/app/interface/artist';
import { Genre } from 'src/app/interface/genre';
import { Hall } from 'src/app/interface/hall';
import { Movie } from 'src/app/interface/movie';
import { Projection } from 'src/app/interface/projection';
import { ArtistService } from 'src/app/service/artist.service';
import { HallService } from 'src/app/service/hall.service';
import { MovieService } from 'src/app/service/movie.service';
import { ProjectionService } from 'src/app/service/projection.service';

@Component({
  selector: 'app-projection-list',
  templateUrl: './projection-list.component.html',
  styleUrls: ['./projection-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ProjectionListComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows: Projection[];
  public selectedOption = 10;
  public temp = [];
  public previousMovieFilter = 0;
  public previousHallFilter = 0;

  public halls;
  public movies;

  public selectedHall;
  public selectedMovie;
  public searchValue = '';

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _movieService: MovieService,
    private _projectionService: ProjectionService,
    private _hallService: HallService,
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedMovie = 0;
    this.selectedHall = 0;

    const val = event.target.value.toLowerCase();

    // Filter Out Data
    const temp = this.tempData.filter(function (d) {
      return d.title.toLowerCase().indexOf(val) !== -1 || !val ;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  filterByMovie(event) {
    const filter = event ? event.id : 0;
    this.previousMovieFilter = filter;
    this.temp = this.filterRows(this.previousHallFilter, filter);
    this.rows = this.temp;
  }

  filterByHall(event) {
    const filter = event ? event.id : 0;
    this.previousHallFilter = filter;
    this.temp = this.filterRows(filter, this.previousMovieFilter);
    this.rows = this.temp;
  }

  filterRows(hallFilter,movieFilter): any[] {

    return this.tempData.filter((row) => {
      const isPartialMovieMatch =
        row.movie.id == movieFilter || !movieFilter || movieFilter == 0;
      console.log(movieFilter);
      const isPartialHallMatch =
        row.hall.id == hallFilter ||
        !hallFilter ||
        hallFilter == 0;

      return isPartialMovieMatch && isPartialHallMatch;
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getHalls();
    this.getMovies();
  }
  public getAll(): void {
    this._projectionService.getAllProjections().subscribe(
      (response: Projection[]) => {
        this.rows = response;
        this.tempData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getHalls() {
    this._hallService.getAllHalls().subscribe(
      (response: Hall[]) => {
        response.unshift({ id: 0, name: 'All' ,seatsNbr: 0});
        this.halls = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }
  getMovies() {
    this._movieService.getAllMovies().subscribe(
      (response: Movie[]) => {
        this.movies = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }
  //Delete selected projection
  onDelete(id){
    this._projectionService.deleteProjection(id).subscribe(
      (response: void) => {},
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}