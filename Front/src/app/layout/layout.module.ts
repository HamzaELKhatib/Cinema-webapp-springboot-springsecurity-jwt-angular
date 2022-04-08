import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CustomBreakPointsProvider } from 'src/app/layout/custom-breakpoints';
import { VerticalLayoutModule } from 'src/app/layout/vertical/vertical-layout.module';

@NgModule({
  imports: [FlexLayoutModule.withConfig({ disableDefaultBps: true }), VerticalLayoutModule],
  providers: [CustomBreakPointsProvider],
  exports: [VerticalLayoutModule,]
})
export class LayoutModule {}
