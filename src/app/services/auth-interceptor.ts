import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import { ContextUtil } from '../guard/context-util.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private auth: AuthenticationService , private router: Router , private ngxService: NgxUiLoaderService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    try {
      if (request.url === `${ContextUtil.getApiUrl()}login`) {
        return next.handle(request);
      }
      const token = this.auth.getToken();
      const req: HttpRequest<any> = request.clone({
        setHeaders: {
          Authorization : `${token}`
        }
      });
      return next.handle(req);
    } catch (error) {
      console.log(error);
      return next.handle(request);
    } finally {
      this.ngxService.stop();
    }
  }

}
