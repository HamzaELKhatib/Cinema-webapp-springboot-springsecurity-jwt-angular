import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UserListComponent} from './list/user-list.component';
import {UserEditComponent} from './edit/user-edit.component';
import {RouterModule, Routes} from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CoreCommonModule} from 'src/@core/common.module';
import {NgSelectModule} from '@ng-select/ng-select';
import {NgxDatatableModule} from '@swimlane/ngx-datatable';
import {CoreSidebarModule} from 'src/@core/components';
import {NewUserSidebarComponent} from './list/new-user-sidebar/new-user-sidebar.component';
import {FormsModule} from '@angular/forms';
import {Ng2FlatpickrModule} from 'ng2-flatpickr';
import {CorePipesModule} from 'src/@core/pipes/pipes.module';
import {CoreDirectivesModule} from 'src/@core/directives/directives';
import {UserService} from '../../../service/user.service';
import {SweetAlert2Module} from "@sweetalert2/ngx-sweetalert2";

const routes: Routes = [
  {
    path: 'list',
    component: UserListComponent,
  },
  {
    path: 'edit/:username',
    component: UserEditComponent,
    data: {path: 'view/:username'},
  },
  {
    path: '',
    redirectTo: 'list',
  },
];

@NgModule({
  declarations: [
    UserListComponent,
    UserEditComponent,
    NewUserSidebarComponent,
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
    SweetAlert2Module.forRoot()

  ],
  providers: [UserService],
})
export class UsersModule {
}
