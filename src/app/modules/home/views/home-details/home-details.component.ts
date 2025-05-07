import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Title2Component } from 'src/app/components/title2/title2.component';
import { Title3Component } from 'src/app/components/title3/title3.component';
import { Title4Component } from 'src/app/components/title4/title4.component';

@Component({
    selector: 'app-home-details',
    templateUrl: './home-details.component.html',
    standalone: true,
    imports: [RouterModule, Title2Component, Title3Component, Title4Component],
})
export class HomeDetailsComponent {

}
