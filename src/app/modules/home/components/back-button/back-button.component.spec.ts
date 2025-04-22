import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackButtonComponent } from './back-button.component';
import { provideRouter } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

describe('BackButtonComponent', () => {
  let component: BackButtonComponent;
  let fixture: ComponentFixture<BackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BackButtonComponent,
        MatIconModule],
      providers: [provideRouter([])],
    })
      .compileComponents();

    fixture = TestBed.createComponent(BackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
