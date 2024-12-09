import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RegisterService } from './register.service';
import { environment } from '../environments/environment';

describe('RegisterService', () => {
  let service: RegisterService;
  let httpMock: HttpTestingController;

  const mockRegisterData = {
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'password123',
  };

  const apiUrl = environment.apiUrl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RegisterService],
    });

    service = TestBed.inject(RegisterService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send a POST request to register a user with the correct headers', () => {
    const basicAuth = 'Basic ' + btoa(environment.basicAuth.username + ':' + environment.basicAuth.password);

    service.registerUser(mockRegisterData).subscribe();

    const req = httpMock.expectOne((req) => req.method === 'POST' && req.url === apiUrl);

    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(basicAuth);
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    
    expect(req.request.body).toEqual(mockRegisterData);

    req.flush({ success: true });
  });

  it('should return response data on successful registration', () => {
    const mockResponse = { success: true };

    service.registerUser(mockRegisterData).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne((req) => req.method === 'POST' && req.url === apiUrl);
    req.flush(mockResponse);
  });

  it('should handle errors on failed registration', () => {
    const mockError = { status: 400, statusText: 'Bad Request' };

    service.registerUser(mockRegisterData).subscribe(
      () => fail('Expected error, but got success'),
      (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Bad Request');
      }
    );

    const req = httpMock.expectOne((req) => req.method === 'POST' && req.url === apiUrl);
    req.flush('Error', mockError);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
