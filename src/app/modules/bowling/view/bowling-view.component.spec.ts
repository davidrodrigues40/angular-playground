import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { BowlingStateService } from 'src/app/state/bowling/service/bowling-state.service';
import { AddPlayerComponent } from '../components/add-player/add-player.component';
import { GameComponent } from '../components/game/game.component';
import { BowlingViewComponent } from './bowling-view.component';

describe('BowlingViewComponent', () => {
  let component: BowlingViewComponent;
  let fixture: ComponentFixture<BowlingViewComponent>;
  let service: jasmine.SpyObj<BowlingStateService> = jasmine.createSpyObj('BowlingStateService',
    ['getRatings', 'addPlayer', 'removePlayer', 'bowl', 'getRatings', 'newGame', 'getScore$', 'getRating$'],
    ['players$', 'game$', 'ratings$', 'winner$']);


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        BowlingViewComponent,
        AddPlayerComponent,
        GameComponent],
      providers: [
        { provide: BowlingStateService, useValue: service }
      ],
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        MatIconModule
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(BowlingViewComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
