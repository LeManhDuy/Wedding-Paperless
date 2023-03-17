import { RegisterSong } from 'src/app/models/song';
import { EditRegisterSongComponent } from './components/register-song/edit-register-song/edit-register-song.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ContentComponent } from './components/content/content.component';
// import { EditAlbumnComponent } from './component/albumn/edit-albumn/edit-albumn.component';
import { AlbumnComponent } from './components/albumn/albumn.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from "./components/login/login.component";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { AuthGuard } from "./_guards/auth.guard";
import { FormComponent } from './components/form/form.component';
import { EditAlbumnComponent } from "./components/albumn/edit-albumn/edit-albumn.component";
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmVerifyCodeComponent } from './components/confirm-verify-code/confirm-verify-code.component';
import { EditContentComponent } from "./components/content/edit-content/edit-content.component";
import { IsExistContentGuard } from './_guards/is-exist-content.guard';
import { RegisterSongComponent } from './components/register-song/register-song.component';
import { AccountComponent } from './components/account/account.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { ShareComponent } from './components/share/share.component';
import {ChartComponent} from "./components/chart/chart.component";
import { FormNewTemplateComponent } from './components/form-new-template/form-new-template.component';
import { NewInvitationComponent } from './components/new-invitation/new-invitation.component';
import { NewShareComponent } from './components/new-share/new-share.component';
import { UpdateInvitationComponent } from './components/update-invitation/update-invitation.component';


const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'dashboard-user', component: DashboardUserComponent, canActivate: [AuthGuard], data: { requiredRole: 'user',showHeader: true } , },
    { path: 'dashboard-admin', component: DashboardAdminComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'login', loadComponent: () => import('./components/login/login.component').then(c => c.LoginComponent) },
    { path: 'register', component: RegisterComponent },

    { path: 'forgotPassword', component: ForgotPasswordComponent },
    { path: 'forgotPassword/confirmVerifyCode', component: ConfirmVerifyCodeComponent },
    { path: 'forgotPassword/confirmVerifyCode/resetPassword', component: ResetPasswordComponent },

    { path: 'not-found', component: NotFoundComponent },

    // { path: 'register-song', loadComponent: () => import('./components/register-song/register-song.component').then(c => c.RegisterSongComponent) },

    { path: 'register-song', component: RegisterSongComponent, canActivate: [AuthGuard], data: { requiredRole: 'user',showHeader: true  } },
    { path: 'register-song/edit/:id', component: EditRegisterSongComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'invitation/:id', component: InvitationComponent,  data: {showHeader: true  }  },
    { path: 'new-invitation/:id', component: NewInvitationComponent,  data: {showHeader: true  }  },
    { path: 'share-invitation/:id', component: ShareComponent },
    { path: 'new-share-invitation/:id', component: NewShareComponent },
    { path: 'update-invitation/:id', component: UpdateInvitationComponent,data: {showHeader: true  } },

    { path: 'content', component: ContentComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin,user',showHeader: true  } },
    { path: 'content/edit/:id', component: EditContentComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    { path: 'albumn', component: AlbumnComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin,user' ,showHeader: true } },
    { path: 'albumn/edit/:id', component: EditAlbumnComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },

    // { path: 'account', loadComponent: () => import('./components/account/account.component').then(c => c.AccountComponent), canActivate: [AuthGuard], data: { requiredRole: 'admin' } },
    { path: 'account', component: AccountComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin' } },
    { path: 'account/edit/:id', component: EditAccountComponent, canActivate: [AuthGuard], data: { requiredRole: 'admin,user' ,showHeader: true } },

    { path: 'chart', component: ChartComponent},

    { path: 'form', component: FormComponent, canActivate: [AuthGuard, IsExistContentGuard], data: { requiredRole: 'user',showHeader: true } },

    { path: 'form-new-template', component: FormNewTemplateComponent, canActivate: [AuthGuard, IsExistContentGuard], data: { requiredRole: 'user',showHeader: true } },


    { path: '**', redirectTo: 'not-found' }


  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
