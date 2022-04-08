import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { CoreSidebarService } from 'src/@core/components/core-sidebar/core-sidebar.service';
import { CoreConfigService } from 'src/@core/services/config.service';
import { Artist } from 'src/app/interface/artist';
import { Hall } from 'src/app/interface/hall';

import { Nationality } from 'src/app/interface/nationality';
import { ArtistService } from 'src/app/service/artist.service';
import { HallService } from 'src/app/service/hall.service';
import { MovieService } from 'src/app/service/movie.service';
import { MovieGenreService } from 'src/app/service/moviegenre.service';
import { NationalityService } from 'src/app/service/nationality.service';

@Component({
  selector: 'app-hall-list',
  templateUrl: './hall-list.component.html',
  styleUrls: ['./hall-list.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class HallListComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows: Hall[];
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
    private _hallService: HallService,
    private _nationalityService: NationalityService,
    private _genresService: MovieGenreService
  ) {
    this._unsubscribeAll = new Subject();
  }


  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

 

  ngOnInit(): void {
    this.getAll();
  }
  public getAll(): void {
    this._hallService.getAllHalls().subscribe(
      (response: Hall[]) => {
        this.rows = response;
        this.tempData = response;
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedType = 0;
    this.selectedNationality = 0;

    const val = event.target.value.toLowerCase();

    // Filter Out Data
    const temp = this.tempData.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val ;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

 

  onDelete(id){
    this._hallService.deleteHall(id).subscribe(
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