import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { RouterModule, Routes } from '@angular/router'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap'

import { CoreCommonModule } from 'src/@core/common.module'

import {LoginComponent} from "./login/login.component";
import {RegisterComponent} from "./register/register.component";

// routing
const routes: Routes = []

@NgModule({
  declarations: [LoginComponent,RegisterComponent],
  imports: [CommonModule, RouterModule.forChild(routes), NgbModule, FormsModule, ReactiveFormsModule, CoreCommonModule]
})
export class AuthenticationModule {}
