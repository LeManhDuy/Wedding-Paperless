import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './component/auth/auth.component';
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from '@angular/common/http';
import { LoginSuccessDialogComponent } from './component/login-success-dialog/login-success-dialog.component';
// import {MatDialogModule} from "@angular/material/dialog";
import { NotFoundComponent } from './component/not-found/not-found.component';
import { CreateInvitationComponent } from './component/create-invitation/create-invitation.component';
import { CreateFormComponent } from './component/create-form/create-form.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    CreateInvitationComponent,
    CreateFormComponent,
    LoginComponent,
    LoginSuccessDialogComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    // MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
