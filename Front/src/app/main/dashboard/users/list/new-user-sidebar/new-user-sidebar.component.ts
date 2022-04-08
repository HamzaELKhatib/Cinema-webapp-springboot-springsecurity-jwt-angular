import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {CoreSidebarService} from 'src/@core/components/core-sidebar/core-sidebar.service';
import {AuthenticationService} from "../../../../../auth/service/authentication.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'new-user-sidebar',
  templateUrl: './new-user-sidebar.component.html',
})
export class NewUserSidebarComponent implements OnInit {

  @Output() onUserAdded = new EventEmitter<boolean>();
  @ViewChild('newUserForm') newUserForm: NgForm;

  public isAddingUser = false;

  constructor(private _coreSidebarService: CoreSidebarService, private _authService: AuthenticationService) {
  }

  toggleSidebar(name): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  submit(form) {
    console.log(form.value)
    if (form.valid) {
      this.isAddingUser = true
      this._authService.register(form.value).subscribe(
        (response) => {

          this.isAddingUser = false

          this.onUserAdded.emit(true);
          this.toggleSidebar('new-user-sidebar');

        }
      )
    }
  }

  ngOnInit(): void {
  }
}
