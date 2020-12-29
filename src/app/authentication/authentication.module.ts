import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {RouterModule, Routes} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {BaseUrlInterceptor} from '../api/http-client.interceptor';
import {UserService} from './user.service';

const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'login', component: LoginComponent
      },
      {
        path: 'register', component: RegisterComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(authRoutes),
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AuthService,
    UserService
  ]
})
export class AuthenticationModule { }
