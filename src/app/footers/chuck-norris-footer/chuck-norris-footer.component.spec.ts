import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFooter } from '../base-footer.component';
import { ChuckNorrisFooterComponent } from './chuck-norris-footer.component';

describe('ChuckNorrisFooterComponent', () =>
{
   let component: ChuckNorrisFooterComponent;
   let fixture: ComponentFixture<ChuckNorrisFooterComponent>;
   const signalService: jasmine.SpyObj<ChuckNorrisSignalService> = jasmine.createSpyObj<ChuckNorrisSignalService>('signal-service', ['fetchFooterFact']);

   beforeEach(() =>
   {
      TestBed.configureTestingModule({
         imports: [ChuckNorrisFooterComponent]
      })
         .overrideComponent(ChuckNorrisFooterComponent, {
            set: {
               imports: [
                  CommonModule,
                  BaseFooter
               ],
               providers: [
                  { provide: ChuckNorrisSignalService, useValue: signalService }
               ]
            }
         });
      fixture = TestBed.createComponent(ChuckNorrisFooterComponent);
      component = fixture.componentInstance;
   });

   it('should create', () =>
   {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () =>
   {
      it('should call fetchFooterFact', () =>
      {
         component.ngOnInit();

         expect(signalService.fetchFooterFact).toHaveBeenCalled();
      });
   });
});
