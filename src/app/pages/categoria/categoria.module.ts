import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriaRoutingModule } from './categoria-routing.module';
import { CategoriaComponent } from './categoria.component';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  declarations: [CategoriaComponent],
  imports: [CommonModule, CategoriaRoutingModule, SidebarModule, NavbarModule],
})
export class CategoriaModule {}
