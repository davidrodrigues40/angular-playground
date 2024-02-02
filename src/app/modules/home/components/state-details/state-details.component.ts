
import { Title3Component } from 'src/app/components/title3/title3.component';

import { Component } from '@angular/core';

@Component({
    selector: 'app-state-details',
    templateUrl: './state-details.component.html',
    styleUrls: ['./state-details.component.scss'],
    standalone: true,
    imports: [
        Title3Component
    ]
})
export class StateDetailsComponent
{

}
