import { Observable } from 'rxjs';
import { HomeMenuStateService } from 'src/app/state/home-menu/services/home-menu-state.service';
import { MenuItem } from 'src/app/state/menu/models/menu-item';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
    selector: 'app-home-menu',
    templateUrl: './home-menu.component.html',
    styleUrls: ['./home-menu.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        RouterModule,
        CommonModule
    ]
})
export class HomeMenuComponent
{
    menuItems: Observable<ReadonlyArray<MenuItem>> = this._stateService.observables.menu$;

    constructor(public readonly router: Router, private readonly _stateService: HomeMenuStateService)
    {
        this._stateService.events.fetchMenu().emit();
    }

    markDisabled(route: string): boolean
    {
        return this.router.url === `/home/${route}`;
    }
}
