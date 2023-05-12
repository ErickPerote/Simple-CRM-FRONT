import { ClientService } from 'src/app/services/Cliente.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
@Injectable({
  providedIn: 'root'
})
export class RouteGuard implements CanActivate {

  constructor(public authService: AuthenticationService, public router: Router, private clientService: ClientService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    let isValid = this.authService.isAuthenticated()
    let user = this.clientService.loadUser()

    if (!isValid) {
      this.router.navigate([''])
      return false
    }
    console.log('ok')

    return true;
  }

}
