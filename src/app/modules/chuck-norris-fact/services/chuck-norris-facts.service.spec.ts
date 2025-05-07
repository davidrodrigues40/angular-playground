import { ChuckNorrisFact } from 'src/app/modules/chuck-norris-fact/models/chuck-norris-fact';

import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ChuckNorrisFactsService } from './chuck-norris-facts.service';
import { ChuckNorrisFactState } from 'src/app/modules/chuck-norris-fact/chuck-norris.state';
import { of } from 'rxjs';

describe('ChuckNorrisFactsService', () => {
   let service: ChuckNorrisFactsService;
   let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);
   let factState: jasmine.Spy;
   let factSet: jasmine.Spy;
   let footerFact: jasmine.Spy;
   let favoriteFactsSet: jasmine.Spy;
   let categoriesSet: jasmine.Spy;
   const defaultFact: ChuckNorrisFact = {
      icon_url: '',
      id: '',
      url: '',
      value: ''
   };
   const defaultCategories: ReadonlyArray<string> = [
      'science',
      'sports'
   ];

   beforeEach(() => {
      TestBed.configureTestingModule({
         providers: [
            ChuckNorrisFactsService,
            { provide: HttpClient, useValue: httpClient }
         ]
      });
      service = TestBed.inject(ChuckNorrisFactsService);

      factState = spyOn(ChuckNorrisFactState, 'fact');
      factSet = spyOn(ChuckNorrisFactState.fact, 'set');
      footerFact = spyOn(ChuckNorrisFactState, 'footerFact');
      favoriteFactsSet = spyOn(ChuckNorrisFactState.favoriteFacts, 'set');
      categoriesSet = spyOn(ChuckNorrisFactState.categories, 'set');

      httpClient.get.calls.reset();
   });

   it('should be created', () => {
      expect(service).toBeTruthy();
   });

   describe('when getFact invoked', () => {
      it('should call getFactForState with fact state', () => {
         // Arrange
         factState.and.returnValue(ChuckNorrisFactState.fact);
         httpClient.get.and.returnValue(of(defaultFact));

         // Act
         service.getFact();

         // Assert
         expect(factSet).toHaveBeenCalledWith(defaultFact);
      });
   });

   describe('when getFactForCategory invoked', () => {
      it('should call getFactForState with fact state', () => {
         // Arrange
         const category = { name: 'random' };
         factState.and.returnValue(ChuckNorrisFactState.fact);
         httpClient.get.and.returnValue(of(defaultFact));

         // Act
         service.getFactForCategory(category);

         // Assert
         expect(factSet).toHaveBeenCalledWith(defaultFact);
      });

      it('should call httpClient.get with correct URL', () => {
         // Arrange
         const category = { name: 'science' };
         const expectedUrl = `https://api.chucknorris.io/jokes/random?category=${category.name}`;
         httpClient.get.and.returnValue(of(defaultFact));

         // Act
         service.getFactForCategory(category);

         // Assert
         expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
      });
   });

   describe('when getCategories invoked', () => {
      it('should call httpClient.get with correct URL', () => {
         // Arrange
         const expectedUrl = 'https://api.chucknorris.io/jokes/categories';
         httpClient.get.and.returnValue(of(defaultCategories));

         // Act
         service.getCategories();

         // Assert
         expect(httpClient.get).toHaveBeenCalledWith(expectedUrl);
         expect(categoriesSet).toHaveBeenCalledWith([{ name: 'random' }, { name: 'science' }, { name: 'sports' }]);
      });
   });

   describe('when getFooterFact invoked', () => {
      it('should call getFactForState with footerFact state', () => {
         // Arrange
         factSet = spyOn(ChuckNorrisFactState.footerFact, 'set');
         factState.and.returnValue(ChuckNorrisFactState.footerFact);
         httpClient.get.and.returnValue(of(defaultFact));

         // Act
         service.getFooterFact();

         // Assert
         expect(factSet).toHaveBeenCalledWith(defaultFact);
      });
   });

   describe('when getFavoriteFacts invoked', () => {
      it('should call favoriteFacts getter', () => {
         // Act
         service.getFavoriteFacts();

         // Assert
         expect(favoriteFactsSet).toHaveBeenCalledWith(service['favoriteFacts']);
      });
   });

   describe('when getFavoriteFact invoked', () => {
      it('should call favoriteFacts getter with random category', () => {

         // Act
         service.getFavoriteFact();

         // Assert
         expect(factSet).toHaveBeenCalledTimes(1);
      });

      it('should call favoriteFacts getter with any category', () => {

         // Act
         service.getFavoriteFact('science');

         // Assert
         expect(factSet).toHaveBeenCalledTimes(1);
      });
   });
});