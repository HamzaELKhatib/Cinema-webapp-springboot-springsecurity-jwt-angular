import {EventEmitter, Injectable, Output} from '@angular/core';
import {
  HttpClient,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Role} from "../../enum/role.enum";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();

  public host = environment.apiBaseUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, {
      observe: 'response',
    });
  }

  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);
  }

  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  public getToken(): string {
    return this.token;
  }


  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
    } else {
      this.logOut();
      return false;
    }
  }


  getUserName() {
    return localStorage.getItem('username');
  }

  getId() {
    return JSON.parse(sessionStorage.getItem('currentUsername')).getId();
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token')
  }

  isAdmin(): boolean {
    return this.getUserFromLocalCache().role === Role.ADMIN;
  }

  isLoggedAsAdmin(): boolean {
    return (this.isAdmin() && this.isLoggedIn());
  }

  getJwtToken() {
    return localStorage.getItem('authenticationToken');
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('isLoggedIn')) {
      return true;
    } else {
      return false;
    }
  }
}
