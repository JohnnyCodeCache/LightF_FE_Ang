import { TestBed } from '@angular/core/testing';

import { GetDataFromAwsApiService } from './get-data-from-aws-api.service';

describe('GetDataFromAwsApiService', () => {
  let service: GetDataFromAwsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDataFromAwsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
