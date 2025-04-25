import { TestBed } from '@angular/core/testing';

import { OperationFactory } from './operation-factory.service';

describe('OperationFactoryService', () => {
  let service: OperationFactory;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperationFactory);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
