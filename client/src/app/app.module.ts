import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './component/auth/auth.component';
import {RegisterComponent} from './component/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginSuccessDialogComponent } from './component/login/login-success-dialog/login-success-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AlbumnComponent } from './component/albumn/albumn.component';
import { RouterModule } from "@angular/router";
import { EditAlbumnComponent } from './component/albumn/edit-albumn/edit-albumn.component';
import { FormComponent } from './component/form/form.component';
import { InvitationComponent } from './component/invitation/invitation.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { CommonModule } from '@angular/common';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ContentComponent } from './component/content/content.component';
import { DashboardUserComponent } from './component/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ConfirmVerifyCodeComponent } from './component/confirm-verify-code/confirm-verify-code.component';

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgImageSliderModule,
    CommonModule,
    RouterModule,
    SlickCarouselModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
