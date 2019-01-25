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
import { CampoVazioPipe } from './pipes/campo-vazio.pipe';
import { NgxUiLoaderModule, NgxUiLoaderHttpModule, NgxUiLoaderConfig, POSITION } from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  'bgsColor': '#00ACC1',
  'bgsOpacity': 0.5,
  'bgsPosition': 'center-center',
  'bgsSize': 60,
  'bgsType': 'cube-grid',
  'blur': 5,
  'fgsColor': '#00ACC1',
  'fgsPosition': 'center-center',
  'fgsSize': 60,
  'fgsType': 'cube-grid',
  'gap': 24,
  'logoPosition': 'center-center',
  'logoSize': 120,
  'logoUrl': '',
  'masterLoaderId': 'master',
  'overlayBorderRadius': '0',
  'overlayColor': 'rgba(93,121,117,0.8)',
  'pbColor': '#00ACC1',
  'pbDirection': 'ltr',
  'pbThickness': 3,
  'hasProgressBar': true,
  'text': 'Carregando',
  'textColor': '#FFFFFF',
  'textPosition': 'center-center',
  'threshold': 500
};

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
    CampoVazioPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderHttpModule,
    AppRoutingModule
  ],
  providers: [AuthenticationService, AuthGuard, ContextUtil, ServicoService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true} ],
  bootstrap: [AppComponent]
})
export class AppModule { }
