import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';

@NgModule({
  providers: [],
  declarations: [DashboardComponent],
  imports: [CommonModule, DashboardRoutingModule, NavbarModule, SidebarModule],
})
export class DashboardModule {}
