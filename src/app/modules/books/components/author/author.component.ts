import { ChangeDetectionStrategy, Component, EventEmitter, Output, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { bookSignals } from 'src/app/state/books/books.signals';
import { BookSignalService } from 'src/app/state/books/service/book-signal.service';

@Component({
   selector: 'app-author',
   templateUrl: './author.component.html',
   standalone: true,
   providers: [BookSignalService],
   imports: [
      FormsModule,
      MatFormFieldModule,
      MatButtonModule,
      MatInputModule
   ],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthorComponent
{
   @Output() authorChanged: EventEmitter<string> = new EventEmitter<string>();

   public author: WritableSignal<string> = bookSignals().author;
}
