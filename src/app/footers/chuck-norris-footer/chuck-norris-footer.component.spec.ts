import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseFooter } from '../base-footer.component';
import { ChuckNorrisFooterComponent } from './chuck-norris-footer.component';
import { ChuckNorrisFactsService } from 'src/app/services/chuck-norris/chuck-norris-facts.service';

describe('ChuckNorrisFooterComponent', () => {
   let component: ChuckNorrisFooterComponent;
   let fixture: ComponentFixture<ChuckNorrisFooterComponent>;
   const signalService: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj<ChuckNorrisFactsService>('signal-service', ['getFooterFact']);

   beforeEach(() => {
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
                  { provide: ChuckNorrisFactsService, useValue: signalService }
               ]
            }
         });
      fixture = TestBed.createComponent(ChuckNorrisFooterComponent);
      component = fixture.componentInstance;
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () => {
      it('should call fetchFooterFact', () => {
         component.ngOnInit();

         expect(signalService.getFooterFact).toHaveBeenCalled();
      });
   });
});
