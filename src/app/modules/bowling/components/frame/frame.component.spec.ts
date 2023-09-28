import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FrameService } from '../../services/frame.service';
import { FrameComponent } from './frame.component';

describe('FrameComponent', () => {
  let component: FrameComponent;
  let fixture: ComponentFixture<FrameComponent>;
  let service: jasmine.SpyObj<FrameService> = jasmine.createSpyObj('FrameService', ['getFrameValues']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FrameComponent],
      providers: [
        { provide: FrameService, useValue: service }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FrameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
