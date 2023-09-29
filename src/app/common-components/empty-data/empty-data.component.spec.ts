import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EmptyDataComponent } from './empty-data.component';

describe('EmptyDataComponent', () => {
  let component: EmptyDataComponent;
  let fixture: ComponentFixture<EmptyDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyDataComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EmptyDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
