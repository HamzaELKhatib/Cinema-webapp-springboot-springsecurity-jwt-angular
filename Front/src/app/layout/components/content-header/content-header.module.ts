import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CoreCommonModule } from 'src/@core/common.module';

import { BreadcrumbModule } from 'src/app/layout/components/content-header/breadcrumb/breadcrumb.module';
import { ContentHeaderComponent } from 'src/app/layout/components/content-header/content-header.component';

@NgModule({
  declarations: [ContentHeaderComponent],
  imports: [CommonModule, RouterModule, CoreCommonModule, BreadcrumbModule, NgbModule],
  exports: [ContentHeaderComponent]
})
export class ContentHeaderModule {}
