import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';




@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  private prefix: string = "Bearer ";

  constructor(private authService: AuthenticationService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url){
    req = req.clone({
      setHeaders: {
        'Content-Type' : 'application/json; charset=utf-8',
        'Accept'       : 'application/json',
        'Authorization': `Bearer ${this.authService.getToken()}`,
      },
    });
  }
    return next.handle(req);
  }

  setAutorization() {
    let token = this.authService.getToken()
    if(this.authService.isAuthenticated()) {
      return { setHeaders: { Authorization: this.prefix + token } }
    } else {
      return null
    }
  }
}
