import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "../../authentication/auth.service";
import { GuardUtil } from "./guard.util";

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUrl = GuardUtil.getResolvedUrl(route);

    const jwtKey = this.authService.getJWTToken()
    const isAdmin = this.authService.isAdmin()
    if (jwtKey === '' || isAdmin === undefined) {
      this.router.navigate(["/login"], {
        queryParams: {
          'redirectUrl': currentUrl
        }
      })
      return false
    }
    if (!isAdmin) {
      this.router.navigate(["/login"], {
        queryParams: {
          'redirectUrl': currentUrl
        }
      })
      return false
    }
    else{
      return true
    }
  }

}