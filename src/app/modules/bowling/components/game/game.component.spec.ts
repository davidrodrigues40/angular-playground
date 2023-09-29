import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GameComponent } from './game.component';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('get rating', () => {
    beforeEach(() => {
      component.ratings = [
        { key: 1, value: 'novice' },
        { key: 2, value: 'intermediate' }
      ]
    })
    it('should return rating', () => {
      const actual = component.getRating(1);

      expect(actual).toEqual('novice');
    });

    it('should return default', () => {
      const actual = component.getRating(3);

      expect(actual).toEqual('Beginner');
    })
  })
});
