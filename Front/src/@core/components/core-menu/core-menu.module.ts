import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { CoreCommonModule } from 'src/@core/common.module';
import { CoreMenuComponent } from 'src/@core/components/core-menu/core-menu.component';

import { CoreMenuVerticalSectionComponent } from 'src/@core/components/core-menu/vertical/section/section.component';
import { CoreMenuVerticalItemComponent } from 'src/@core/components/core-menu/vertical/item/item.component';
import { CoreMenuVerticalCollapsibleComponent } from 'src/@core/components/core-menu/vertical/collapsible/collapsible.component';
import { CoreMenuHorizontalItemComponent } from 'src/@core/components/core-menu/horizontal/item/item.component';
import { CoreMenuHorizontalCollapsibleComponent } from 'src/@core/components/core-menu/horizontal/collapsible/collapsible.component';

CoreMenuVerticalSectionComponent;
CoreMenuVerticalItemComponent;
CoreMenuVerticalCollapsibleComponent;

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TranslateModule.forChild(),
    CoreCommonModule,
  ],
  exports: [CoreMenuComponent],
  declarations: [
    CoreMenuComponent,
    CoreMenuVerticalSectionComponent,
    CoreMenuVerticalItemComponent,
    CoreMenuVerticalCollapsibleComponent,
    CoreMenuHorizontalItemComponent,
    CoreMenuHorizontalCollapsibleComponent,
  ],
})
export class CoreMenuModule {}
