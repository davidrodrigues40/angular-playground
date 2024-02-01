import { Component, Input } from '@angular/core';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';

@Component({
  selector: 'app-fact',
  templateUrl: './fact.component.html',
  styleUrls: ['./fact.component.scss'],
})
export class FactComponent {
  @Input() fact: ChuckNorrisFact = {
    icon_url: '',
    id: '',
    url: '',
    value: ''
  };
}
