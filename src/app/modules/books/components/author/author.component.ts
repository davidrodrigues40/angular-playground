import { ChangeDetectionStrategy, Component, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BooksState } from 'src/app/state/books.state';

@Component({
   selector: 'app-author',
   templateUrl: './author.component.html',
   standalone: true,
   imports: [
      FormsModule,
      MatFormFieldModule,
      MatButtonModule,
      MatInputModule,
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent {
   public author: WritableSignal<string> = BooksState.author;
}
