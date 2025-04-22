import { Component } from '@angular/core';
import { NgrxDetailsComponent } from '../../components/ngrx-details/ngrx-details.component';

@Component({
   selector: 'app-ngrx-view',
   templateUrl: './ngrx-view.component.html',
   standalone: true,
   imports: [NgrxDetailsComponent],
})
export class NgrxViewComponent {

}
