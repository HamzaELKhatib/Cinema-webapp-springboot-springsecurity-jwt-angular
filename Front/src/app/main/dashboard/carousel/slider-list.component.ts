import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {Subject} from 'rxjs';

import {CoreConfigService} from 'src/@core/services/config.service';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {HttpErrorResponse} from '@angular/common/http';
import Swal from "sweetalert2";
import {Slider} from "../../../interface/slider";
import {SliderService} from "../../../service/slider.service";

@Component({
  selector: 'app-carousel-list',
  templateUrl: './slider-list.component.html',
  styleUrls: ['./slider-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SliderListComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;


  public selectedRole = [];
  public selectedStatus = [];
  public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _sliderService: SliderService
  ) {
    this._unsubscribeAll = new Subject();
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  ngOnInit(): void {
    this.getAll();
  }

  deleteSlider(id) {
    this._sliderService.delete(id).subscribe(
      () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'Silder item has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
        this.getAll()
      }
    )
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
        this.deleteSlider(id)
      }
    });
  }

  public getAll(): void {
    this._sliderService.getAll().subscribe(
      (response: Slider[]) => {
        this.rows = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
