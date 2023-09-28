import { Component, OnInit } from '@angular/core';
import { Observable, first } from 'rxjs';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisStateService } from 'src/app/state/chuck-norris/service/chuck-norris-state.service';

@Component({
  selector: 'app-fact-generator',
  templateUrl: './fact-generator.component.html',
  styleUrls: ['./fact-generator.component.scss']
})
export class FactGeneratorComponent implements OnInit {
  public fact$: Observable<ChuckNorrisFact> = this._service.observables.fact$;
  public categories$: Observable<ReadonlyArray<FactCategory>> = this._service.observables.categories$;
  public selectedCategory$: Observable<FactCategory | undefined> = this._service.observables.selectedCategory$;

  constructor(private readonly _service: ChuckNorrisStateService) { }

  ngOnInit(): void {
    this._service.events.fetchCategories().emit();
  }

  getFact(): void {
    this._service.events.fetchFact().emit();
  }

  getFactForCategory(): void {
    this._service.observables.selectedCategory$
      .pipe(first())
      .subscribe(category => this._service.events.fetchFactForCategory(category as FactCategory).emit());
  }

  categorySelected(category: FactCategory): void {
    this._service.events.setSelectedCategory(category).emit();
  }
}
