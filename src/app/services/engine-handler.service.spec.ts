import { TestBed } from '@angular/core/testing';

import { EngineHandlerService } from './engine-handler.service';

describe('EngineHandlerService', () => {
  let service: EngineHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EngineHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
