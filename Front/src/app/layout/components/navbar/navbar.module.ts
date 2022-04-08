import {NgModule} from '@angular/core'
import {RouterModule} from '@angular/router'

import {NgbModule} from '@ng-bootstrap/ng-bootstrap'
import {PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface, PerfectScrollbarModule} from 'ngx-perfect-scrollbar'

import {CoreCommonModule} from 'src/@core/common.module'
import {CoreTouchspinModule} from 'src/@core/components/core-touchspin/core-touchspin.module'

import {NavbarComponent} from 'src/app/layout/components/navbar/navbar.component'


const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelPropagation: false
}

@NgModule({
  declarations: [NavbarComponent],
  imports: [RouterModule, NgbModule, CoreCommonModule, PerfectScrollbarModule, CoreTouchspinModule],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  exports: [NavbarComponent]
})
export class NavbarModule {
}
