import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { CoreSidebarService } from 'src/@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from 'src/@core/services/config.service';
import { Artist } from 'src/app/interface/artist';
import { Nationality } from 'src/app/interface/nationality';
import { ArtistService } from 'src/app/service/artist.service';
import { MovieService } from 'src/app/service/movie.service';
import { MovieGenreService } from 'src/app/service/moviegenre.service';
import { NationalityService } from 'src/app/service/nationality.service';

@Component({
  selector: 'app-artist-list',
  templateUrl: './artist-list.component.html',
  styleUrls: ['./artist-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class ArtistListComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows: Artist[];
  public selectedOption = 10;
  public temp = [];
  public previousTypeFilter = 0;
  public previousNationalityFilter = 0;

  public nationalities;
  public types;

  public selectedNationality;
  public selectedType;
  public searchValue = '';

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;
  @ViewChild(DatatableComponent) table: DatatableComponent;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _movieService: MovieService,
    private _artistService: ArtistService,
    private _nationalityService: NationalityService,
    private _genresService: MovieGenreService
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedType = 0;
    this.selectedNationality = 0;

    const val = event.target.value.toLowerCase();

    // Filter Out Data
    const temp = this.tempData.filter(function (d) {
      return d.firstName.toLowerCase().indexOf(val) !== -1 ||d.lastName.toLowerCase().indexOf(val) !== -1 || !val ;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  filterByType(event) {
    const filter = event ? event : 0;
    this.previousTypeFilter = filter;
    this.temp = this.filterRows(this.previousNationalityFilter, filter);
    this.rows = this.temp;
  }

  filterByNationality(event) {
    const filter = event ? event.id : 0;
    this.previousNationalityFilter = filter;
    this.temp = this.filterRows(filter, this.previousTypeFilter);
    this.rows = this.temp;
  }

  filterRows(nationalityFilter,typeFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    return this.tempData.filter((row) => {
      const isPartialTypeMatch =
        row.type == typeFilter || !typeFilter || typeFilter == 0;
      console.log(typeFilter);
      const isPartialNationalityMatch =
        row.nationality.id == nationalityFilter ||
        !nationalityFilter ||
        nationalityFilter == 0;

      return isPartialTypeMatch && isPartialNationalityMatch;
    });
  }

  ngOnInit(): void {
    this.getAll();
    this.getNationalities();
    this.types = ["ACTOR","DIRECTOR","WRITER"];
  }
  public getAll(): void {
    this._artistService.getAllArtists().subscribe(
      (response: Artist[]) => {
        this.rows = response;
        this.tempData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  getNationalities() {
    this._nationalityService.getAll().subscribe(
      (response: Nationality[]) => {
        response.unshift({ id: 0, title: 'All' });
        this.nationalities = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        alert(error.message);
      }
    );
  }

  onDelete(id){
    this._artistService.deleteArtist(id).subscribe(
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
