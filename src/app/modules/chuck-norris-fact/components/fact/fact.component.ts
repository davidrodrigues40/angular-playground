import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';

import { Component, Input } from '@angular/core';

@Component({
   selector: 'app-fact',
   templateUrl: './fact.component.html',
   styleUrls: ['./fact.component.scss'],
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
