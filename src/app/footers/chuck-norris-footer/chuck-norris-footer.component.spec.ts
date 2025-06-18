import { TestBed } from '@angular/core/testing';

import { ChuckNorrisFooterComponent } from './chuck-norris-footer.component';
import { ChuckNorrisFactsService } from 'src/app/modules/chuck-norris-fact/services/chuck-norris-facts.service';

describe('ChuckNorrisFooterComponent', () => {
   let component: ChuckNorrisFooterComponent;
   const factService: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj<ChuckNorrisFactsService>('service', ['getFooterFact']);

   beforeEach(() => {
      TestBed.configureTestingModule({
         imports: [ChuckNorrisFooterComponent],
         providers: [
            ChuckNorrisFooterComponent,
            { provide: ChuckNorrisFactsService, useValue: factService }
         ],
      })
         .compileComponents();

      component = TestBed.inject(ChuckNorrisFooterComponent);
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   describe('ngOnInit', () => {
      it('should call fetchFooterFact', () => {
         component.ngOnInit();

         expect(factService.getFooterFact).toHaveBeenCalled();
      });
   });
});
