import { Component, Input } from '@angular/core';

import { CoreMenuItem } from 'src/@core/types';

@Component({
  selector: '[core-menu-vertical-item]',
  templateUrl: './item.component.html',
})
export class CoreMenuVerticalItemComponent {
  @Input()
  item: CoreMenuItem;
}
