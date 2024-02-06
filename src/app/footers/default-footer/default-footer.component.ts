import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { BaseFooter } from '../base-footer.component';

@Component({
   selector: 'app-default-footer',
   templateUrl: './default-footer.component.html',
   standalone: true,
   imports: [CommonModule, BaseFooter],
})
export class DefaultFooterComponent
{

}
