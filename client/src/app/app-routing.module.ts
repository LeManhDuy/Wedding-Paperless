import { EditContentComponent } from './component/content/edit-content/edit-content.component';
import { EditRegisterSongComponent } from './component/register-song/edit-register-song/edit-register-song.component';
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
import { InvitationComponent } from './component/invitation/invitation.component';
import { AuthGuard } from "./_guards/auth.guard";
import { FormComponent } from './component/form/form.component';
import { EditAlbumnComponent } from "./component/albumn/edit-albumn/edit-albumn.component";
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { ConfirmVerifyCodeComponent } from './component/confirm-verify-code/confirm-verify-code.component';
import { NavbarComponent } from './component/navbar/navbar.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path:'', component: NavbarComponent},
    { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard], data: { requiredRole: 'user' } },
    { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'login', loadComponent: () => import('./component/login/login.component').then(c => c.LoginComponent) },
    { path: 'register', component: RegisterComponent },
    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'forgotPassword/confirmVerifyCode', component: ConfirmVerifyCodeComponent },
    { path: 'forgotPassword/confirmVerifyCode/resetPassword', component: ResetPasswordComponent },
    { path: 'not-found', component: NotFoundComponent },

    { path: 'register-song', loadComponent: () => import('./component/register-song/register-song.component').then(c => c.RegisterSongComponent) },
    { path: 'register-song/edit/:id', component: EditRegisterSongComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'invitation', component: InvitationComponent },

    { path: 'content', component: ContentComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin,user' } },
    { path: 'content/edit/:id', component: EditContentComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'albumn', component: AlbumnComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin,user' } },
    { path: 'albumn/edit/:id', component: EditAlbumnComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'form', component: FormComponent, canActivate: [AuthGuard], data: { requiredRole: 'user' } },
    { path: '**', redirectTo: 'not-found' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
