import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

import { CoreCommonModule } from 'src/@core/common.module'

import { ErrorComponent } from 'src/app/main/pages/miscellaneous/error/error.component'

// routing
const routes: Routes = [
  {
    path: 'miscellaneous/error',
    component: ErrorComponent
  }
]

@NgModule({
  declarations: [ErrorComponent],
  imports: [CommonModule, RouterModule.forChild(routes), CoreCommonModule]
})
export class MiscellaneousModule {}
