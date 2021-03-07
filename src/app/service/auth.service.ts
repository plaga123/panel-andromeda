import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User, UserResponse } from './../interface/user'
import { environment } from '../../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt';

import Swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';


const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user = new BehaviorSubject<UserResponse>(null);
  
  constructor(
    private http: HttpClient, 
    private router: Router,    
    ) {
    this.checkToken();
  }
  get user$(): Observable<UserResponse> {
    return this.user.asObservable();
  }

  get userValue(): UserResponse {

    return this.user.getValue();
  }
  login(authData: User): Observable<UserResponse | void> {
    return this.http
      .post<UserResponse>(`${environment.apiUrl}auth/signin`, authData)
      .pipe(
        map((user: UserResponse) => {
          this.saveLocalStorage(user);
          this.user.next(user);
          this.router.navigate(['/']);
          return user;
        }),
        catchError((err) => this.handlerError(err))
      );
  }

  RegistrarUser(data) {   
    return this.http.post(`${environment.apiUrl}auth/signup`, data);
  }

  logout(): void {
    localStorage.removeItem('user');      

    this.user.next(null);
    this.router.navigate(['/']);
  }

  private checkToken(): void {
    const user = JSON.parse(localStorage.getItem('user')) || null;

    if (user) {
      const isExpired = helper.isTokenExpired(user.token);

      if (isExpired) {
        this.logout();
      } else {
        this.user.next(user);
      }
    }
  }

  private saveLocalStorage(user: UserResponse): void {   
    const { email, ...rest } = user;
    localStorage.setItem('user', JSON.stringify(rest));
    
  }

  private handlerError(err): Observable<never> {
    let errorMessage = 'Error data';
    if (err) {
      errorMessage = `Error: code ${err.message}`;
    }
    // window.alert('Holaaaa');
    Swal.fire(
      'Error de Credenciales',
      'Presione el boton para continuar',
      'error'
    ) 
    return throwError(errorMessage);
  }

  getToken(){
    let token = localStorage.getItem('user');
    return this.payload(token);
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  } 
}
