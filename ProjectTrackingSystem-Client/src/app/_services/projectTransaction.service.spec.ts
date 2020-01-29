/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProjectTransactionService } from './projectTransaction.service';

describe('Service: ProjectTransaction', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProjectTransactionService]
    });
  });

  it('should ...', inject([ProjectTransactionService], (service: ProjectTransactionService) => {
    expect(service).toBeTruthy();
  }));
});
