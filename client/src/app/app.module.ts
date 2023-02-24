import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './component/auth/auth.component';
import {RegisterComponent} from './component/register/register.component';
import {LoginComponent} from './component/login/login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
// import {LoginComponent} from './component/login/login.component';
import {HttpClientModule} from '@angular/common/http';
import { LoginSuccessDialogComponent } from './component/login/login-success-dialog/login-success-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { NotFoundComponent } from './component/not-found/not-found.component';
import { AlbumnComponent } from './component/albumn/albumn.component';
// import { EditAlbumnComponent } from './component/albumn/edit-albumn/edit-albumn.component';
import { EditAlbumnComponent } from 'src/app/component/albumn/edit-albumn/edit-albumn.component';
import { HomeComponent } from './component/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    LoginSuccessDialogComponent,
    NotFoundComponent,
    AlbumnComponent,
    EditAlbumnComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
