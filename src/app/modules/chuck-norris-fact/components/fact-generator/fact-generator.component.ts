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
  public fact$: Observable<ChuckNorrisFact> = this._service.fact$;
  public categories$: Observable<ReadonlyArray<FactCategory>> = this._service.categories$;
  public selectedCategory$: Observable<FactCategory | undefined> = this._service.selectedCategory$;

  constructor(private readonly _service: ChuckNorrisStateService) { }

  ngOnInit(): void {
    this._service.fetchCategories$();
  }

  getFact(): void {
    this._service.fetchFact$();
  }

  getFactForCategory(): void {
    this._service.selectedCategory$
      .pipe(first())
      .subscribe(category => this._service.fetchFactForCategory$(category as FactCategory));
  }

  categorySelected(category: FactCategory): void {
    this._service.setSelectedCategory$(category);
  }
}
