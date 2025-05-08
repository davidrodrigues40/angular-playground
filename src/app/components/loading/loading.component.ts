import { Component, input, InputSignal } from '@angular/core';
import { MatProgressSpinnerModule, ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-loading',
  imports: [
    MatProgressSpinnerModule
  ],
  standalone: true,
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.scss'
})
export class LoadingComponent {
  protected mode: ProgressSpinnerMode = 'indeterminate';
  diameter: InputSignal<number> = input<number>(100);
}
