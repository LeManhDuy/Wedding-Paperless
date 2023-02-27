import { DashboardComponent } from './component/dashboard/dashboard.component';
// import { EditAlbumnComponent } from './component/albumn/edit-albumn/edit-albumn.component';
import { AlbumnComponent } from './component/albumn/albumn.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './component/register/register.component'
import { LoginComponent } from "./component/login/login.component";
import { NotFoundComponent } from './component/not-found/not-found.component';
import { EditAlbumnComponent } from "./component/albumn/edit-albumn/edit-albumn.component";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot([
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'not-found', component: NotFoundComponent },
    { path: 'albumn', component: AlbumnComponent },
    { path: 'albumn/edit/:id', component: EditAlbumnComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '**', redirectTo: 'not-found' }
  ])],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
