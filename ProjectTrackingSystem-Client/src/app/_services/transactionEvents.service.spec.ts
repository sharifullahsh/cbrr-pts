/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TransactionEventsService } from './transactionEvents.service';

describe('Service: TransactionEvents', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TransactionEventsService]
    });
  });

  it('should ...', inject([TransactionEventsService], (service: TransactionEventsService) => {
    expect(service).toBeTruthy();
  }));
});
