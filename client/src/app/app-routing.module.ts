import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ContentComponent } from './components/content/content.component';
// import { EditAlbumnComponent } from './components/albumn/edit-albumn/edit-albumn.components';
import { AlbumnComponent } from './components/albumn/albumn.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import {AuthGuard} from "./_guards/auth.guard";
import { FormComponent } from './components/form/form.component';
import { EditAlbumnComponent } from "./components/albumn/edit-albumn/edit-albumn.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmVerifyCodeComponent } from './components/confirm-verify-code/confirm-verify-code.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard], data: { requiredRole: 'user' } },
    { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },
    { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
    { path: 'register-song', loadComponent: () => import('./components/register-song/register-song.component').then(c => c.RegisterSongComponent)},
    { path: 'register', component: RegisterComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'forgotPassword/confirmVerifyCode', component: ConfirmVerifyCodeComponent },
    { path: 'forgotPassword/confirmVerifyCode/resetPassword', component: ResetPasswordComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'invitation', component: InvitationComponent },
    { path: 'content', component: ContentComponent, canActivate: [AuthGuard], data: {requiredRole: 'admin,user'} },
    { path: 'albumn', component: AlbumnComponent, canActivate: [AuthGuard], data: {requiredRole: 'admin,user'} },
    { path: 'form', component: FormComponent, canActivate: [AuthGuard], data: {requiredRole: 'user'} },
    { path: 'albumn/edit/:id', component: EditAlbumnComponent, canActivate: [AuthGuard], data: {requiredRole: 'admin'} },
    { path: '**', redirectTo: 'not-found' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
