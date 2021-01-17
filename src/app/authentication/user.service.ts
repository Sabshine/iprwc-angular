import {Injectable} from '@angular/core';
import {UserModel} from './user.model';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class UserService{
  constructor(private httpClient: HttpClient) {}

  saveUser(user: UserModel): void {
    localStorage.setItem('usermail', user.email);
  }

  getUserInfo(email: string): Observable<any> {
    return this.httpClient.get(
      'user/id/' + email
    ).pipe(tap((response: any) => {
      if(!response.content) {
        return;
      }
      localStorage.setItem('userId', response.content.id);
    }));
  }

  getUser(): UserModel | undefined {
    const userJSON = JSON.parse(localStorage.getItem('user') as string);
    if (!userJSON) {
      return undefined;
    }

    return {
      email: userJSON.email,
      password: '',
      isAdmin: userJSON.isAdmin,
    };
  }

}
