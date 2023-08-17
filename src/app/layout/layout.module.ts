import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { SharedModule } from '../shared/shared.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    MainLayoutComponent,
    PageNotFoundComponent,
    SidenavComponent,
    DashboardComponent,
  ],
  exports: [SidenavComponent],
  imports: [LayoutRoutingModule, SharedModule],
})
export class LayoutModule { }
