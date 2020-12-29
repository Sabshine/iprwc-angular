import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';
import {UserModel} from './user.model';
import {BehaviorSubject, Observable} from 'rxjs';
import {UserService} from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public isLoggedInSubject = new BehaviorSubject(false);
  storagekeys = ['token', 'isAdmin']
  
  constructor(private httpClient: HttpClient, private userService: UserService) {}

  login(user: UserModel): Observable<any> {
    return this.httpClient.post(
      'auth/login',
      user
    ).pipe(tap((response: any) => {
      this.isLoggedInSubject.next(true);
      localStorage.setItem('token', response.content.key);
      localStorage.setItem('isAdmin', response.content.isAdmin);
      this.userService.saveUser(user);
      // user.isAdmin = response.content.isAdmin;
    }));
  }


  getJWTToken(): string {
    try {
      const jwtToken = localStorage.getItem('token') as string;
      if (jwtToken === null || jwtToken === undefined) {
        return '';
      }
      return jwtToken;
    } catch (e) {
      return '';
    }
  }

  register(user: UserModel): Observable<any> {
    return this.httpClient.post(
      'auth/register',
      user
    ).pipe(tap((response: any) => {
      localStorage.setItem('token', response.content.key);
      localStorage.setItem('isAdmin', response.content.isAdmin);
      this.userService.saveUser(user);
    }));
  }

  emailExists(email: string): Observable<any> {
    return this.httpClient.get(
      'user/' + encodeURIComponent(email) + '/exists',
    );
  }

  isAdmin(): boolean | undefined {
    try {
      const isAdmin = localStorage.getItem('isAdmin')
      return isAdmin == "true";
    } catch (e) {
      return undefined;
    }
  }

  isLoggedIn(): boolean | undefined {
    try {
      const isLoggedIn = localStorage.getItem('token') as string;
      return isLoggedIn.length > 0;
    } catch (e) {
      return false;
    }
  }
  
  logout() {
    this.isLoggedInSubject.next(false);
  }
}
