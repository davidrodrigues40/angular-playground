import { TestBed } from '@angular/core/testing';
import { LOCAL_STORAGE, SESSION_STORAGE, StorageService, StorageTranscoders } from 'ngx-webstorage-service';
import { CacheService } from './cache.service';

describe('CacheService', () => {
  let service: CacheService;
  let local: jasmine.SpyObj<StorageService<typeof LOCAL_STORAGE>> = jasmine.createSpyObj('StorageService', ['set', 'get', 'has']);
  let session: jasmine.SpyObj<StorageService<typeof SESSION_STORAGE>> = jasmine.createSpyObj('StorageService', ['set', 'get', 'has']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LOCAL_STORAGE, useValue: local },
        { provide: SESSION_STORAGE, useValue: session }
      ]
    });
    service = TestBed.inject(CacheService);
    local.get.calls.reset();
    local.has.calls.reset();
    session.get.calls.reset();
    session.has.calls.reset();
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

    it('should return false when session doesn\'t have key', () => {
      session.has.and.returnValue(false);

      const actual: boolean = service.sessionHas('test');

      expect(session.has).toHaveBeenCalledOnceWith('test');
      expect(actual).toEqual(false);
    });

    it('should return true when session has key', () => {
      session.has.and.returnValue(true);

      const actual: boolean = service.sessionHas('test');

      expect(session.has).toHaveBeenCalledOnceWith('test');
      expect(actual).toEqual(true);
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

    it('should return false when local doesn\'t have key', () => {
      local.has.and.returnValue(false);

      const actual: boolean = service.localHas('test');

      expect(local.has).toHaveBeenCalledOnceWith('test');
      expect(actual).toEqual(false);
    });

    it('should return true when local has key', () => {
      local.has.and.returnValue(true);

      const actual: boolean = service.localHas('test');

      expect(local.has).toHaveBeenCalledOnceWith('test');
      expect(actual).toEqual(true);
    });
  });
});
