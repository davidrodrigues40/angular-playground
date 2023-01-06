import { NgModule } from '@angular/core';
import { EmptyDataComponent } from './empty-data/empty-data.component';



@NgModule({
  declarations: [EmptyDataComponent],
  exports: [
    EmptyDataComponent
  ]
})
export class CommonComponentModule { }
