import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginSuccessDialogComponent } from './components/login/login-success-dialog/login-success-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlbumnComponent } from './components/albumn/albumn.component';
import { RouterModule } from "@angular/router";
import { EditAlbumnComponent } from './components/albumn/edit-albumn/edit-albumn.component';
import { FormComponent } from './components/form/form.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ContentComponent } from './components/content/content.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmVerifyCodeComponent } from './components/confirm-verify-code/confirm-verify-code.component';
import { EditRegisterSongComponent } from './components/register-song/edit-register-song/edit-register-song.component';
import { EditContentComponent } from './components/content/edit-content/edit-content.component';
import { NavbarComponent } from './components/navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginSuccessDialogComponent,
    NotFoundComponent,
    AlbumnComponent,
    EditAlbumnComponent,
    FormComponent,
    InvitationComponent,
    ContentComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmVerifyCodeComponent,
    EditRegisterSongComponent,
    EditContentComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
