import { Component } from '@angular/core';
import { DataFlowDetailsComponent } from '../../components/data-flow-details/data-flow-details.component';

@Component({
    selector: 'app-data-flow',
    templateUrl: './data-flow.component.html',
    styleUrls: ['./data-flow.component.scss'],
    imports: [DataFlowDetailsComponent],
    standalone: true,
})
export class DataFlowComponent { }
