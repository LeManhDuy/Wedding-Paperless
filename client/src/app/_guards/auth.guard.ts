import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { catchError, Observable, of } from 'rxjs';
import { LoginService } from "../_services/login.service";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private loginService: LoginService
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    const requiredRole = route.data['requiredRole'];


    return this.loginService.currentUser.pipe(
      map(user => {
        if (user.token) {
          if (requiredRole) {
            const payloadBase64 = user.token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const payloadObject = JSON.parse(payloadJson);
            if (requiredRole == payloadObject['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']) {
              return true;
            }
            else {
              this.router.navigate([''])
              return false;

            }
          }
          return true
          // logged in so return true
        } else {
          this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
          location.reload()
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return of(false);
      })
    );
  }
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //
  //   const currentUser = this.loginService.currentUser;
  //   if (currentUser) {
  //     console.log("Debug authen",currentUser)
  //     // logged in so return true
  //     return true;
  //   }
  //   this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }



}
