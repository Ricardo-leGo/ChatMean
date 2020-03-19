/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocketsService } from './sockets.service';

describe('SocketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocketsService]
    });
  });

  it('should ...', inject([SocketsService], (service: SocketsService) => {
    expect(service).toBeTruthy();
  }));
});
