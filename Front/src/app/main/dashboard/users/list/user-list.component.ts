import {Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ColumnMode, DatatableComponent} from '@swimlane/ngx-datatable';

import {Subject} from 'rxjs';

import {CoreConfigService} from 'src/@core/services/config.service';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {HttpErrorResponse} from '@angular/common/http';
import {UserService} from '../../../../service/user.service';
import {User} from '../../../../auth/models/user';
import Swal from "sweetalert2";

@Component({
  selector: 'app-my-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserListComponent implements OnInit {
  public sidebarToggleRef = false;
  public rows;
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp;
  public previousRoleFilter = '';
  public previousStatusFilter = '';

  public selectRole: any = [
    {name: 'All', value: ''},
    {name: 'Admin', value: 'ROLE_ADMIN'},
    {name: 'User', value: 'ROLE_USER'},
  ];

  public selectStatus: any = [
    {name: 'All', value: 'all'},
    {name: 'Active', value: true},
    {name: 'Inactive', value: false},
  ];

  public selectedRole = [];
  public selectedStatus = [];
  public searchValue = '';

  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private tempData = [];
  private _unsubscribeAll: Subject<any>;

  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _usersService: UserService
  ) {
    this._unsubscribeAll = new Subject();
  }

  filterUpdate(event) {
    // Reset ng-select on search
    this.selectedRole = this.selectRole[0];
    this.selectedStatus = this.selectStatus[0];

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.tempData.filter(function (d) {
      return d.fullName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.rows = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  filterByRole(event) {
    const filter = event ? event.value : '';
    this.previousRoleFilter = filter;
    this.temp = this.filterRows(filter, this.previousStatusFilter);
    this.rows = this.temp;
  }

  filterByStatus(event) {
    const filter = event ? event.value : '';
    this.previousStatusFilter = filter;
    this.temp = this.filterRows(this.previousRoleFilter, filter);
    this.rows = this.temp;
  }

  filterRows(roleFilter, statusFilter): any[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();


    return this.tempData.filter((row) => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;

      const isPartialStatusMatch = row.active === statusFilter || statusFilter === 'all';

      return isPartialNameMatch && isPartialStatusMatch;
    });
  }

  ngOnInit(): void {
    this.getAll();
  }

  deleteUser(username) {
    this._usersService.deleteUser(username).subscribe(
      () => {
        Swal.fire({
          title: 'Deleted!',
          text: 'User has been deleted.',
          icon: 'success',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });
        this.getAll()
      }
    )
  }

  ConfirmColorOpen(username) {
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
        this.deleteUser(username)
      }
    });
  }

  public getAll(): void {
    this._usersService.getUsers().subscribe(
      (response: User[]) => {
        response.map((user: any) => {
          user.fullName = user.firstName + ' ' + user.lastName;
          return user;
        });
        this.rows = response;
        this.tempData = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
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
