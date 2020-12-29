import {Injectable} from '@angular/core';
import { EventEmitter } from 'events';

@Injectable()
export class SharedService{
  isLoggedIn = false;
  isAdmin = false;

  setLoggedIn(bool: boolean){
    this.isLoggedIn = bool;
  }

  getLoggedIn(){
    return this.isLoggedIn
  }

  setAdmin(bool: boolean){
    this.isAdmin = bool;
  }

  getAdmin(){
    return this.isAdmin
  }
  
}
