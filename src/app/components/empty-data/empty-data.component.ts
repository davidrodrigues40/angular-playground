import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-empty-data',
  templateUrl: './empty-data.component.html',
  styleUrls: ['./empty-data.component.scss'],
  standalone: true
})
export class EmptyDataComponent {
  @Input() dataName: string = 'data';
}
