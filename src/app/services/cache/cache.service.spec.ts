import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let local: jasmine.SpyObj<StorageService<typeof LOCAL_STORAGE>> = jasmine.createSpyObj('StorageService', ['set', 'get']);
  let session: jasmine.SpyObj<StorageService<typeof SESSION_STORAGE>> = jasmine.createSpyObj('StorageService', ['set', 'get']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCAL_STORAGE, useValue: local },
        { provide: SESSION_STORAGE, useValue: session }
      ]
    });
    service = TestBed.inject(CacheService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('when using session storage', () => {
    it('should set the value', () => {
      service.setSession('test', 'test', StorageTranscoders.STRING);

      expect(session.set).toHaveBeenCalledOnceWith('test', 'test', StorageTranscoders.STRING);
    });

    it('should get the value', () => {
      session.get.and.returnValue('test');

      const actual: string = service.getSession('test', StorageTranscoders.STRING);

      expect(session.get).toHaveBeenCalledOnceWith('test', StorageTranscoders.STRING);
      expect(actual).toEqual('test');
    });
  });

  describe('when using local storage', () => {
    it('should set the value', () => {
      service.setLocal('test', 'test', StorageTranscoders.STRING);

      expect(local.set).toHaveBeenCalledOnceWith('test', 'test', StorageTranscoders.STRING);
    });

    it('should get the value', () => {
      local.get.and.returnValue('test2');

      const actual: string = service.getLocal('test', StorageTranscoders.STRING);

      expect(local.get).toHaveBeenCalledOnceWith('test', StorageTranscoders.STRING);
      expect(actual).toEqual('test2');
    });
  });
});
