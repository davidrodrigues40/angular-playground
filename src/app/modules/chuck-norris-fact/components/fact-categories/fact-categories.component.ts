import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';

@Component({
  selector: 'app-fact-categories',
  templateUrl: './fact-categories.component.html'
})
export class FactCategoriesComponent {
  @Input() options: ReadonlyArray<FactCategory> = [];
  @Output() categorySelected: EventEmitter<FactCategory> = new EventEmitter<FactCategory>();

  selectionChange(event: MatSelectChange): void {
    this.categorySelected.emit(event.value);
  }
}
