import { Component } from '@angular/core';

import { BaseFooter } from '../base-footer.component';

@Component({
   selector: 'app-chuck-norris-footer',
   templateUrl: './chuck-norris-footer.component.html',
   imports: [BaseFooter],
   standalone: true
})
export class ChuckNorrisFooterComponent
{

}
