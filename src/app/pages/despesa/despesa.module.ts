import { SidebarModule } from './../../components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaComponent } from './despesa.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  declarations: [DespesaComponent],
  imports: [CommonModule, DespesaRoutingModule, SidebarModule, NavbarModule],
})
export class DespesaModule {}
