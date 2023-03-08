import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarAdminComponent } from './sidebar-admin.component';



@NgModule({
  declarations: [SidebarAdminComponent],
  imports: [
    CommonModule,
    RouterModule,
    
  ],
  exports:[
    SidebarAdminComponent
  ]
})
export class SidebarAdminModule { }
