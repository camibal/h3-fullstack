import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserResponse } from '../interface/login';
import { JwtHelperService } from "@auth0/angular-jwt";

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  get inLogged(): Observable<Boolean> {
    return this.loggedIn.asObservable();
  }

  login(authData: User): Observable<UserResponse | void> {
    return this.http.post<UserResponse>(`${environment.endpoint}/auth/login`, authData)
      .pipe(
        map((res: UserResponse) => {
          //saved token
          this.saveToken(res.token);
          this.loggedIn.next(true);
          return res;
        }),
        catchError((err) => this.handlerError(err))
      );
  }
  logout(): void {
    localStorage.removeItem('token');
    this.loggedIn.next(false);
  }

  private checkToken(): void {
    const userToken = localStorage.getItem('token')
    const isExpired = helper.isTokenExpired(userToken);
    console.log('isExpired->', isExpired);
    if (isExpired) {
      this.logout();
    } else {
      this.loggedIn.next(true);
    }
    //set userisLogged = isExpired
  }

  private saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'An error ocurred retrienving data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}
