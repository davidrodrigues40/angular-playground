import { ChuckNorrisFact } from 'src/app/interfaces/models/chuck-norris/chuck-norris-fact';
import { ChuckNorrisSignalService } from 'src/app/state/chuck-norris/service/chuck-norris-signal.service';
import { TestingSpys } from 'src/app/testing/testing.spys';

import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFooter } from '../base-footer.component';
import { ChuckNorrisFooterComponent } from './chuck-norris-footer.component';

describe('ChuckNorrisFooterComponent', () =>
{
   let component: ChuckNorrisFooterComponent;
   let fixture: ComponentFixture<ChuckNorrisFooterComponent>;
   const signalService: jasmine.SpyObj<ChuckNorrisSignalService> = TestingSpys.signalService<ChuckNorrisSignalService>(['bindFooterFact'], ['fetchFooterFact']);
   const footerFact: ChuckNorrisFact = {
      icon_url: '',
      id: '',
      url: '',
      value: ''
   };

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

      Object.defineProperties(signalService, {
         observables: {
            value: {
               footerFact: footerFact
            }
         },
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

         expect(signalService.events.fetchFooterFact).toHaveBeenCalled();
      });
   });
});
