import { DashboardUserComponent } from './component/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './component/dashboard-admin/dashboard-admin.component';
import { ContentComponent } from './component/content/content.component';
// import { EditAlbumnComponent } from './component/albumn/edit-albumn/edit-albumn.component';
import { AlbumnComponent } from './component/albumn/albumn.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component'
import { LoginComponent } from "./component/login/login.component";
import { NotFoundComponent } from './component/not-found/not-found.component';
import {EditAlbumnComponent} from "./component/albumn/edit-albumn/edit-albumn.component";
import { InvitationComponent } from './component/invitation/invitation.component';
import {AuthGuard} from "./_guards/auth.guard";
import { FormComponent } from './component/form/form.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard], data: { requiredRole: 'user' } },
    { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },
    { path: 'login', loadComponent: () => import('./component/login/login.component').then(m => m.LoginComponent) },
    { path: 'register', component: RegisterComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'invitation', component: InvitationComponent },
    { path: 'content', component: ContentComponent },
    { path: 'albumn', component: AlbumnComponent, canActivate: [AuthGuard], data: {requiredRole: 'admin,user'} },
    { path: 'form', component: FormComponent, canActivate: [AuthGuard], data: {requiredRole: 'user'} },
    { path: 'albumn/edit/:id', component: EditAlbumnComponent, canActivate: [AuthGuard], data: {requiredRole: 'admin'} },
    { path: '**', redirectTo: 'not-found' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
