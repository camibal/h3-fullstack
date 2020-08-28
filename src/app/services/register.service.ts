import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Register } from '../interface/register';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private htttp: HttpClient) { }

  registerUser(RegisterForm: Register): Observable<Register> {
    return this.htttp.post<Register>(`${environment.endpoint}/auth/register`, RegisterForm);
  }

  // setUser(user: Register): void {
  //   let user_string = JSON.stringify(user);
  //   localStorage.setItem("currentUser", user_string);
  // }

  // setToken(token): void {
  //   localStorage.setItem("token", token);
  // }
}
