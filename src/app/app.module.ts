import { FormDebugComponent } from './form-debug/form-debug.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './routing-module/routing-module.module';
import { HomeComponent } from './home/home.component';
import { ClientesComponent } from './clientes/clientes.component';
import { AuthGuard } from './guard/auth-guard.service';
import { AgendamentosComponent } from './agendamentos/agendamentos.component';
import { LogoutComponent } from './logout/logout.component';
import { AuthenticationService } from './services/authentication.service';
import { ContextUtil } from './guard/context-util.service';
import { AuthInterceptor } from './services/auth-interceptor';
import { ErrorInterceptor } from './services/error-interceptor';
import { ServicoComponent } from './servico/servico.component';
import { ServicoService } from './services/servico.service';
import { ProfissionalComponent } from './profissional/profissional.component';
import { FormaPagamentoComponent } from './forma-pagamento/forma-pagamento.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    FormDebugComponent,
    HomeComponent,
    ClientesComponent,
    AgendamentosComponent,
    LogoutComponent,
    ServicoComponent,
    ProfissionalComponent,
    FormaPagamentoComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, AuthGuard, ContextUtil, ServicoService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
