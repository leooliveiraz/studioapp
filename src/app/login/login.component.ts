import { AuthenticationService } from '../services/authentication.service';
import { Usuario } from './../entity/usuario';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) {
   }

  usuario: any = Usuario;

  ngOnInit() {

  }


  onSubmit(form) {
    try {
      this.authService.realizarLogin(JSON.stringify(form.value));
    } catch (error) {
      console.log(error);
    }
  }

}
