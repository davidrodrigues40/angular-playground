import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TitleComponent } from 'src/app/components/title/title.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    standalone: true,
    imports: [TitleComponent, RouterModule],
})
export class HomeComponent {

}
