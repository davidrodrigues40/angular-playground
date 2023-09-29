import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { BooksState } from 'src/app/state/app.state';
import { Event } from 'src/app/state/common/event';
import { MenuItem } from 'src/app/state/menu/models/menu-item';
import { MenuStateService } from 'src/app/state/menu/service/menu-state.service';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: jasmine.SpyObj<MenuStateService> = jasmine.createSpyObj('MenuStateService', ['events', 'observables']);
  let event: jasmine.SpyObj<Event<string, Store<BooksState>>> = jasmine.createSpyObj('Event', ['emit']);
  const menu: MenuItem[] = [];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuComponent],
      providers: [
        { provide: MenuStateService, useValue: service }
      ],
      imports: [
        MatIconModule,
        MatMenuModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;

    Object.defineProperties(service, {
      events: {
        value: {
          fetchMenu: function (id: string) { return event; }
        }
      },
      observables: {
        value: {
          menu$: of(menu)
        }
      }
    });
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should call fetchMenu$', () => {
      component.ngOnInit();

      expect(event.emit).toHaveBeenCalledTimes(1);
    });
  });
});
