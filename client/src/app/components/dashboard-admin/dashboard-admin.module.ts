import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountComponent } from '../account/account.component';
import { AlbumnComponent } from '../albumn/albumn.component';
import { ContentComponent } from '../content/content.component';
import { RegisterSongComponent } from '../register-song/register-song.component';

import {BrowserModule} from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [
    AccountComponent,
    RegisterSongComponent,
    AlbumnComponent,
    ContentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    FormsModule,
    
  ]
})
export class DashboardAdminModule { }