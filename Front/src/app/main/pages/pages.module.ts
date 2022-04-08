import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'

import { CoreCommonModule } from 'src/@core/common.module'
import { ContentHeaderModule } from 'src/app/layout/components/content-header/content-header.module'

import { AuthenticationModule } from './authentication/authentication.module'
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module'
import {LoginComponent} from "./authentication/login/login.component";
import {RegisterComponent} from "./authentication/register/register.component";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoreCommonModule,
    ContentHeaderModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    AuthenticationModule,
    MiscellaneousModule
  ],

  providers: []
})
export class PagesModule {}
