import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { MenuService } from './menu.service';

describe('MenuService', () => {
  let service: MenuService;
  let httpClient: jasmine.SpyObj<HttpClient> = jasmine.createSpyObj('HttpClient', ['get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MenuService,
        { provide: HttpClient, useValue: httpClient }
      ]
    });
    service = TestBed.inject(MenuService);
    httpClient.get.calls.reset();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when getAll$ invoked', () => {
    it('should call httpClient.get and return menu items', () => {
      httpClient.get.and.returnValue(of([]));

      service.getAll$()
        .subscribe((menuItems) => {
          expect(menuItems).toEqual([]);
        });
    });
  });
});
