import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { ContextUtil } from '../guard/context-util.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      console.log('errorInterceptor');
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401 && request.url !== `${ContextUtil.getApiUrl()}login` )  {
              console.log(`erro : ${err.status}`);
              swal('Sua Sessão expirou', 'Por favor, faça login novamente', 'error');
            }

            return throwError(err);
        }));
    }
}
