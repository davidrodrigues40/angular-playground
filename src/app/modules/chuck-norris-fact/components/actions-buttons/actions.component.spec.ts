import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionsComponent } from './actions.component';
import { FactCategory } from '../../models/fact-category';
import { ChuckNorrisFactsService } from '../../services/chuck-norris-facts.service';

describe('ActionsComponent', () => {
  let component: ActionsComponent;
  let fixture: ComponentFixture<ActionsComponent>;
  let selectedCategorySpy: jasmine.Spy;
  const service: jasmine.SpyObj<ChuckNorrisFactsService> = jasmine.createSpyObj<ChuckNorrisFactsService>(
    'service',
    ['getFact', 'getFactForCategory', 'getCategories', 'getFooterFact', 'getFavoriteFact', 'getFavoriteFacts'],);
  const category: FactCategory = {
    name: ''
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActionsComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ActionsComponent);
    component = fixture.componentInstance;

    selectedCategorySpy = spyOn<any>(component, 'selectedCategory');

    service.getFact.calls.reset();
    service.getFactForCategory.calls.reset();
    service.getFavoriteFact.calls.reset();
    service.getFavoriteFacts.calls.reset();
    service.getFooterFact.calls.reset();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('when getFact invoked', () => {
    it('should call fetchFact', () => {
      component.getFact();

      expect(service.getFact).toHaveBeenCalledTimes(1);
    });
  });

  describe('when getFactForCategory invoked', () => {
    it('should call getFact when category is not set', () => {
      selectedCategorySpy.and.returnValue(null);

      component.getFactForCategory();

      expect(service.getFact).toHaveBeenCalled();
    });

    it('should call getFactForCategory when category is set', () => {
      const myCategory: FactCategory = { ...category, name: 'test' };
      selectedCategorySpy.and.returnValue(myCategory);

      component.getFactForCategory();

      expect(service.getFactForCategory).toHaveBeenCalledOnceWith(myCategory);
    });
  });

  describe('when getFavoriteFact invoked', () => {
    it('should call getFavoriteFact', () => {
      const myCategory: FactCategory = { ...category, name: 'test' };
      selectedCategorySpy.and.returnValue(myCategory);

      component.getFavoriteFact();

      expect(service.getFavoriteFact).toHaveBeenCalledOnceWith(myCategory.name);
    });

    it('should call getFavoriteFact with random category', () => {
      selectedCategorySpy.and.returnValue(null);

      component.getFavoriteFact();

      expect(service.getFavoriteFact).toHaveBeenCalledOnceWith('random');
    });
  });

  describe('when getAllFavoriteFacts invoked', () => {
    it('should call getFavoriteFacts', () => {
      component.getAllFavoriteFacts();

      expect(service.getFavoriteFacts).toHaveBeenCalledTimes(1);
    });
  });
});
