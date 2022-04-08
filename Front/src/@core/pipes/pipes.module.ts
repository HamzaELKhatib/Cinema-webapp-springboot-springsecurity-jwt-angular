import { NgModule } from '@angular/core';

import { FilterPipe } from 'src/@core/pipes/filter.pipe';

import { InitialsPipe } from 'src/@core/pipes/initials.pipe';

import { SafePipe } from 'src/@core/pipes/safe.pipe';
import { StripHtmlPipe } from 'src/@core/pipes/stripHtml.pipe';

@NgModule({
  declarations: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe],
  imports: [],
  exports: [InitialsPipe, FilterPipe, StripHtmlPipe, SafePipe],
})
export class CorePipesModule {}
