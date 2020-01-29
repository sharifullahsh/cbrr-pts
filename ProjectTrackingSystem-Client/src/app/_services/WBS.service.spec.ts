/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { WBSService } from './WBS.service';

describe('Service: WBS', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WBSService]
    });
  });

  it('should ...', inject([WBSService], (service: WBSService) => {
    expect(service).toBeTruthy();
  }));
});
