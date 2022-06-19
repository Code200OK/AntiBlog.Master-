import { SignUpService } from './sign-up.service';
import { SignUpCredentials } from '../models';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';

describe('registerUser()', () => {
  let httpTestingController: HttpTestingController;
  let registrationService: SignUpService;

  const mockUser: SignUpCredentials = {
    fullName: 'fullName',
    userName: 'userName',
    email: 'example@example.com',
    password: 'Campus321',
    confirmPassword: 'Campus321'
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SignUpService],
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    registrationService = TestBed.inject(SignUpService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  test('should return token when user created', () => {
    const mockToken: string = 'token';

    registrationService.signUp(mockUser)
      .subscribe(token => {
        expect(token).toEqual(mockToken);
      }
      );

    const req = httpTestingController.expectOne('/api/profile/create');
    expect(req.request.method).toMatch('POST');

    req.flush(mockToken);
  });

  test('should failed with 400 error when user exists', (done) => {
    const errorMsg = 'User already exists';

    registrationService.signUp(mockUser)
      .subscribe((_) => {
        fail('should have failed with 400 error');
        done();
      },
        (error: HttpErrorResponse) => {
          expect(error.status).toBe(400);
          expect(error.error).toEqual(errorMsg);
          done();
        }
      );

    const req = httpTestingController.expectOne('/api/profile/create');
    expect(req.request.method).toMatch('POST');

    req.flush(errorMsg, { status: 400, statusText: 'Bad Request' });
  });
});
