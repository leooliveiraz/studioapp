import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { ClientesComponent } from '../clientes/clientes.component';
import { AuthGuard } from '../guard/auth-guard.service';
import { AgendamentosComponent } from '../agendamentos/agendamentos.component';
import { LogoutComponent } from '../logout/logout.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard] },
  { path: 'clientes', component: ClientesComponent , canActivate: [AuthGuard]  },
  { path: 'agendamentos', component: AgendamentosComponent , canActivate: [AuthGuard]  },
  { path: 'logout', component: LogoutComponent , canActivate: [AuthGuard]  },
  { path: '', pathMatch: 'full', redirectTo: 'home' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
