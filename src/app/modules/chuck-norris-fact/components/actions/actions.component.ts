import { Component, inject } from '@angular/core';
import { ChuckNorrisFactState } from '../../chuck-norris.state';
import { FactCategory } from '../../models/fact-category';
import { ChuckNorrisFactsService } from '../../services/chuck-norris-facts.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-actions',
  imports: [
    MatButtonModule
  ],
  providers: [ChuckNorrisFactsService],
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {

  private readonly _service: ChuckNorrisFactsService = inject(ChuckNorrisFactsService);

  getFactForCategory(): void {
    const category: FactCategory | null = ChuckNorrisFactState.selectedCategory();

    if (category !== null) {
      ChuckNorrisFactState.loading.set(true);
      ChuckNorrisFactState.favoriteFacts.set([]);
      this._service.getFactForCategory(category);
    }
    else
      this.getFact();
  }

  getFact(): void {
    ChuckNorrisFactState.loading.set(true);

    ChuckNorrisFactState.favoriteFacts.set([]);
    this._service.getFact();
  }

  getFavoriteFact(): void {
    ChuckNorrisFactState.favoriteFacts.set([]);
    this._service.getFavoriteFact(ChuckNorrisFactState.selectedCategory()?.name ?? 'random');
  }

  getAllFavoriteFacts(): void {
    this._service.getFavoriteFacts();
  }

}
