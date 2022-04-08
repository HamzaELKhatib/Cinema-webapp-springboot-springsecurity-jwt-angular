import { NgModule } from '@angular/core';

import { CoreCommonModule } from 'src/@core/common.module';

import { MenuComponent } from 'src/app/layout/components/menu/menu.component';
import { VerticalMenuModule } from 'src/app/layout/components/menu/vertical-menu/vertical-menu.module';

@NgModule({
  declarations: [MenuComponent],
  imports: [CoreCommonModule, VerticalMenuModule],
  exports: [MenuComponent]
})
export class MenuModule {}
