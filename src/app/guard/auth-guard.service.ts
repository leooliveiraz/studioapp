import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../login/authentication.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    let validou = false;
    this.authService.tokenValido().then(valido => validou = valido);
    console.log(route.url);
    console.log(`Token Auth: ${validou}`);
    if (validou) {
      console.log('AUTH GUARD está autenticado');
      return true;
    } else {
      console.log('AUTH GUARD  não está autenticado');
      return true;
    }
  }
}
