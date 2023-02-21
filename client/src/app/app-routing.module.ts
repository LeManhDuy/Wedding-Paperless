import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './component/auth/auth.component';
import { RegisterComponent } from './component/register/register.component'

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: 'auth', component: AuthComponent },
    { path: 'register', component: RegisterComponent },
    // { path: '**', redirectTo: 'login' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule { }
