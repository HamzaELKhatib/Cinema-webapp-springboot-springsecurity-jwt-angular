import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FlatpickrOptions } from 'ng2-flatpickr';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { cloneDeep } from 'lodash';

@Component({
  selector: 'app-my-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss'],
})
export class UserEditComponent implements OnInit, OnDestroy {
  // Public
  public url = this.router.url;
  public urlLastValue;
  public rows;
  public currentRow;
  public tempRow;
  public avatarImage: string;

  @ViewChild('accountForm') accountForm: NgForm;

  public birthDateOptions: FlatpickrOptions = {
    altInput: true,
  };

  // Private
  private _unsubscribeAll: Subject<any>;

  constructor(private router: Router) {
    this._unsubscribeAll = new Subject();
    this.urlLastValue = this.url.substr(this.url.lastIndexOf('/') + 1);
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  resetFormWithDefaultValues() {
    this.accountForm.resetForm(this.tempRow);
  }

  uploadImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.onload = (event: any) => {
        this.avatarImage = event.target.result;
      };

      reader.readAsDataURL(event.target.files[0]);
    }
  }

  submit(form) {
    if (form.valid) {
      console.log('Submitted...!');
    }
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  ngOnInit(): void {
    this.currentRow = {
      id: 1,
      userId: 'userId',
      firstName: 'firstName',
      lastName: 'lastName',
      username: 'username',
      password: 'password',
      email: 'email',
      profileImageUrl: 'assets/images/avatars/10.png',
      lastLoginDate: 'test',
      lastLoginDateDisplay: 'test',
      joinDate: '02/06/1999',
      role: 'Admin',
      authorities: [],
      isActive: false,
      isNotLocked: true,
      avatar: '',
    };

    this.avatarImage = this.currentRow.avatar;
    this.tempRow = cloneDeep(this.currentRow);
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
