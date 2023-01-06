import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

@Component({
  selector: 'app-fact-categories',
  templateUrl: './fact-categories.component.html',
  styleUrls: ['./fact-categories.component.scss']
})
export class FactCategoriesComponent {
  @Input() options: FactCategory[] = [];
  @Output() selectionChange: EventEmitter<MatSelectChange> = new EventEmitter<MatSelectChange>();
  selected: string = 'random';
}
