import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuItem } from 'src/app/state/menu/models/menu-item';
import { MenuStateService } from 'src/app/state/menu/service/menu-state.service';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit
{
    public items$: Observable<ReadonlyArray<MenuItem>> = this._service.observables.menu$;

    constructor(private readonly _service: MenuStateService) { }

    ngOnInit(): void
    {
        this._service.events.fetchMenu().emit();
        this.items$.subscribe(items => console.log(items));
    }
}
