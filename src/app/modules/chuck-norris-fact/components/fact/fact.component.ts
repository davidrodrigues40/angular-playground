import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';

import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-fact',
   standalone: true,
   templateUrl: './fact.component.html',
   styleUrls: ['./fact.component.scss'],
   imports: [EmptyDataComponent]
})
export class FactComponent
{
   @Input() fact: ChuckNorrisFact = {
      icon_url: '',
      id: '',
      url: '',
      value: ''
   };
}
