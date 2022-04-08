import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { CoreCommonModule } from 'src/@core/common.module';
import { CoreSidebarModule } from 'src/@core/components';

import { NavbarModule } from 'src/app/layout/components/navbar/navbar.module';
import { ContentModule } from 'src/app/layout/components/content/content.module';
import { MenuModule } from 'src/app/layout/components/menu/menu.module';
import { FooterModule } from 'src/app/layout/components/footer/footer.module';

import { VerticalLayoutComponent } from 'src/app/layout/vertical/vertical-layout.component';

@NgModule({
  declarations: [VerticalLayoutComponent],
  imports: [RouterModule, CoreCommonModule, CoreSidebarModule, NavbarModule, MenuModule, ContentModule, FooterModule],
  exports: [VerticalLayoutComponent]
})
export class VerticalLayoutModule {}
