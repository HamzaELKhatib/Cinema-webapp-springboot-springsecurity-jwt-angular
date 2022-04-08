import { Component, Input } from '@angular/core';

import { CoreMenuItem } from 'src/@core/types';

@Component({
  selector: '[core-menu-vertical-section]',
  templateUrl: './section.component.html',
})
export class CoreMenuVerticalSectionComponent {
  @Input()
  item: CoreMenuItem;
}
