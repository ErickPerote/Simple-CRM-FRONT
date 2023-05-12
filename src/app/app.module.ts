import { MainLayoutComponent } from './components/mainLayout.ts/mainLayout.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { HttpInterceptorService } from './config/http.Interceptor';
import { ClientComponent } from './views/client/client.component';
import { ClientEditModalComponent } from './components/client-edit-modal/client-edit-modal.component';
import { ClientCreateModalComponent } from './components/client-create-modal/client-create-modal.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NgxMaskModule } from 'ngx-mask';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ClientComponent,
    ClientEditModalComponent,
    ClientCreateModalComponent,
    MainLayoutComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    ModalModule,
    NgxMaskModule.forRoot(),
    BrowserAnimationsModule,
  ],
  providers: [BsModalService,
    {
      provide : HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi   : true,
    },],
  bootstrap: [AppComponent]
})
export class AppModule { }
