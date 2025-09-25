import { TestBed } from '@angular/core/testing';

import { MockEvent } from './mock-event';

describe('MockEvent', () => {
  let service: MockEvent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MockEvent);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
