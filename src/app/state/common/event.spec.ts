import { TestBed } from '@angular/core/testing';
import { Action } from '@ngrx/store';
import { Event } from './event';

describe('EventService', () => {
  let service: Event<string, any>;
  let action: jasmine.SpyObj<Action> = jasmine.createSpyObj('Action', ['type']);

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = new Event<string, any>(action, null);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
