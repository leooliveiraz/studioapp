import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ContextUtil } from '../guard/context-util.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService , private router: Router) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url === `${ContextUtil.getApiUrl()}login`) {
      return next.handle(request);
    }
    const token = this.auth.getToken();
    const req: HttpRequest<any> = request.clone({
      setHeaders: {
        Authorization : `${token}`
      }
    });
    console.log(`'adiciona header'${token}`);
    return next.handle(req);
  }

}
