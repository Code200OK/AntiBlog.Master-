import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { SignUpCredentials } from '../models';

@Injectable({
  providedIn: 'root',
})
export class RegistrationService {
  constructor(private httpClient: HttpClient) { }

  registerUser(user: SignUpCredentials): Observable<string> {
    return this.httpClient.post<string>(environment.createProfilePath, user);
  }
}
