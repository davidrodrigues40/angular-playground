import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { ChuckNorrisFact } from 'src/app/state/chuck-norris/models/chuck-norris-fact';
import { FactCategory } from 'src/app/state/chuck-norris/models/fact-category';
import { ChuckNorrisFactsService } from './chuck-norris-facts.service';

describe('ChuckNorrisFactsService', () => {
  let service: ChuckNorrisFactsService;
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
  const defaultFact: ChuckNorrisFact = {
    icon_url: '',
    id: '',
    url: '',
    value: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ChuckNorrisFactsService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(ChuckNorrisFactsService);
    httpClient.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when getFacts$ invoked', () => {
    it('should call httpClient.get and return facts', () => {
      httpClient.get.and.returnValue(of(defaultFact));

      service.getFact$()
        .subscribe((fact) => {
          expect(fact).toEqual(defaultFact);
        });
    });
  });

  describe('when getFactForCategory$ invoked', () => {
    it('should call httpClient.get and return fact', () => {
      const category: FactCategory = {
        category: ''
      };
      httpClient.get.and.returnValue(of(defaultFact));

      service.getFactForCategory$(category)
        .subscribe((fact) => {
          expect(fact).toEqual(defaultFact);
        });
    });

    it('shoul get random fact', () => {
      const category: FactCategory = {
        category: 'random'
      };
      httpClient.get.and.returnValue(of(defaultFact));

      service.getFactForCategory$(category)
        .subscribe((fact) => {
          expect(fact).toEqual(defaultFact);
        });
    });
  });

  describe('when getCategories$ invoked', () => {
    it('should call httpClient.get and return categories', () => {
      const categories: string[] = ['help', 'me'];
      const expected: FactCategory[] = categories.map((category) => ({ category }));
      expected.unshift({ category: 'random' });

      httpClient.get.and.returnValue(of(categories));

      service.getCategories$()
        .subscribe((categories) => {
          expect(categories).toEqual(categories);
        });
    });
  });
});
