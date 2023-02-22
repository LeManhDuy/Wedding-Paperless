import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RegisterComponent} from './component/register/register.component'
import {LoginComponent} from "./component/login/login.component";
import {NotFoundComponent} from './component/not-found/not-found.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    {path: '', component: LoginComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'not-found', component: NotFoundComponent},
    { path: '**', redirectTo: 'not-found' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
