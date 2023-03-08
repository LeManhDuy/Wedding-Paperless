import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable } from 'rxjs';
import { ContentService } from '../_services/content.service';
import { LoginService } from '../_services/login.service';

@Injectable({
  providedIn: 'root'
})
export class IsExistContentGuard implements CanActivate {

  constructor(private contentService : ContentService, private router: Router, private loginService: LoginService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      console.log(2324242342);
      
      return this.contentService.checkContentIsExistByPersonId().
      pipe(map(respone => {
        this.contentService.setExistContent(respone);
        if(respone === false){
          return true;
        }
        this.router.navigate(['/dashboard-user']);
        return false;
      }))
  }
}
