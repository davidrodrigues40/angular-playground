import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MenuStateService } from 'src/app/state/menu/service/menu-state.service';
import { MenuComponent } from './menu.component';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let service: jasmine.SpyObj<MenuStateService> = jasmine.createSpyObj('MenuStateService',
    ['fetchMenu$'],
    ['menu$']);

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
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
