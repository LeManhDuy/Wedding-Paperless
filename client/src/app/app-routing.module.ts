// import { EditAlbumnComponent } from './component/albumn/edit-albumn/edit-albumn.component';
import { AlbumnComponent } from './component/albumn/albumn.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component'
import { LoginComponent } from "./component/login/login.component";
import { NotFoundComponent } from './component/not-found/not-found.component';
import {EditAlbumnComponent} from "./component/albumn/edit-albumn/edit-albumn.component";
import {AuthGuard} from "./_guards/auth.guard";
import {HomeComponent} from "./component/home/home.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: HomeComponent, canActivate: [AuthGuard]},
    { path: 'home', component: HomeComponent,canActivate: [AuthGuard] },
    // { path: 'login', component: LoginComponent},
    { path: 'login', loadComponent: () => import('./component/login/login.component').then(m=>m.LoginComponent)},
    { path: 'register', component: RegisterComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'albumn', component: AlbumnComponent, canActivate: [AuthGuard], data: {requiredRole: 'admin'} },
    { path: 'albumn/edit/:id', component: EditAlbumnComponent, canActivate: [AuthGuard], data: {requiredRole: 'user'} },
    { path: '**', redirectTo: 'not-found' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
