import { NgModule } from '@angular/core';
import { EmptyDataComponent } from './empty-data/empty-data.component';
import { TitleComponent } from './title/title.component';
import { SubTitleComponent } from './sub-title/sub-title.component';



@NgModule({
    declarations: [
        EmptyDataComponent,
        TitleComponent,
        SubTitleComponent],
    exports: [
        EmptyDataComponent,
        TitleComponent,
        SubTitleComponent
    ]
})
export class CommonComponentModule { }
