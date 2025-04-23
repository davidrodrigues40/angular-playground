import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatIconModule } from '@angular/material/icon';
import { PlayerComponent } from './player.component';

describe('PlayerComponent', () => {
   let component: PlayerComponent;
   let fixture: ComponentFixture<PlayerComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            MatIconModule,
            PlayerComponent,
         ]
      })
         .compileComponents();

      fixture = TestBed.createComponent(PlayerComponent);
      component = fixture.componentInstance;

   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
