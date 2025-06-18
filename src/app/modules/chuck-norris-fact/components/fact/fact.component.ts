import { EmptyDataComponent } from 'src/app/components/empty-data/empty-data.component';
import { ChuckNorrisFact } from 'src/app/modules/chuck-norris-fact/models/chuck-norris-fact';

import { CommonModule } from '@angular/common';
import { Component, input, InputSignal } from '@angular/core';

@Component({
   selector: 'app-fact',
   standalone: true,
   templateUrl: './fact.component.html',
   styleUrls: ['./fact.component.scss'],
   imports: [
      CommonModule,
      EmptyDataComponent]
})
export class FactComponent {
   fact: InputSignal<ChuckNorrisFact> = input<ChuckNorrisFact>({
      icon_url: '',
      id: '',
      url: '',
      value: ''
   });
}
