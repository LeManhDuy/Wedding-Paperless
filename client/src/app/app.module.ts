import { UserHeaderComponent } from './components/userHeader/userHeader.component';
import { AccountComponent } from './components/account/account.component';
import { RegisterSongComponent } from './components/register-song/register-song.component';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthComponent} from './components/auth/auth.component';
import {RegisterComponent} from './components/register/register.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { LoginSuccessDialogComponent } from './components/login/login-success-dialog/login-success-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AlbumnComponent } from './components/albumn/albumn.component';
import { RouterModule } from "@angular/router";
import { FormComponent } from './components/form/form.component';
import { InvitationComponent } from './components/invitation/invitation.component';
import { CommonModule } from '@angular/common';
import { ErrorInterceptor } from "./_helpers/error.interceptor";
import { JwtInterceptor } from "./_helpers/jwt.interceptor";
import { ContentComponent } from './components/content/content.component';
import { DashboardUserComponent } from './components/dashboard-user/dashboard-user.component';
import { DashboardAdminComponent } from './components/dashboard-admin/dashboard-admin.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ConfirmVerifyCodeComponent } from './components/confirm-verify-code/confirm-verify-code.component';
import { EditRegisterSongComponent } from './components/register-song/edit-register-song/edit-register-song.component';
import { EditContentComponent } from './components/content/edit-content/edit-content.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { ImageInputComponent } from './components/form/image-input/image-input.component';
import { EditAccountComponent } from './components/account/edit-account/edit-account.component';
import { EditAlbumnComponent } from './components/albumn/edit-albumn/edit-albumn.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingComponent } from './components/loading/loading.component';
import { QRCodeModule } from 'angularx-qrcode';
import { ColorPickerModule } from 'ngx-color-picker';
import { ShareComponent } from './components/share/share.component';
import { ChartComponent } from './components/chart/chart.component';
import { ChartModule } from 'angular-highcharts';
import { ChartByMonthComponent } from './components/chart/chart-by-month/chart-by-month.component';
import { ChartByYearComponent } from './components/chart/chart-by-year/chart-by-year.component';
import { ChartByDayComponent } from './components/chart/chart-by-day/chart-by-day.component';
import { ContentChartComponent } from "./components/chart/chart-by-day/content/content.component";
import { AccountChartComponent } from "./components/chart/chart-by-day/account/account.component";
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { StopPropagationDirectiveService } from 'src/assets/stop-propagation-directive.service';
import { NgbModule,NgbAlertModule  } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './components/alert/alert.component';
import { FormNewTemplateComponent } from './components/form-new-template/form-new-template.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginSuccessDialogComponent,
    NotFoundComponent,
    AlbumnComponent,
    EditAlbumnComponent,
    FormComponent,
    InvitationComponent,
    ContentComponent,
    DashboardUserComponent,
    DashboardAdminComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ConfirmVerifyCodeComponent,
    EditContentComponent,
    ImageInputComponent,
    RegisterSongComponent,
    EditRegisterSongComponent,
    AccountComponent,
    EditAccountComponent,
    FooterComponent,
    LoadingComponent,
    UserHeaderComponent,
    ShareComponent,
    ChartComponent,
    ChartByMonthComponent,
    ChartByYearComponent,
    ChartByDayComponent,
    ContentChartComponent,
    AccountChartComponent,
    ShareComponent,
    RegisterFormComponent,
    StopPropagationDirectiveService,
    AlertComponent,
    FormNewTemplateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    NgImageSliderModule,
    QRCodeModule,
    ColorPickerModule,
    NgbModule,
    NgbAlertModule,
    ChartModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
