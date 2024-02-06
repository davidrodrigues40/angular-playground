import { Component } from '@angular/core';

import { BaseFooter } from '../base-footer.component';

@Component({
   selector: 'app-books-footer',
   standalone: true,
   imports: [BaseFooter],
   templateUrl: './books-footer.component.html',
})
export class BooksFooterComponent
{

}
