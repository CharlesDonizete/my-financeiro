import { SidebarModule } from './../../components/sidebar/sidebar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaComponent } from './despesa.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [DespesaComponent],
  imports: [
    CommonModule,
    DespesaRoutingModule,
    SidebarModule,
    NavbarModule,
    ReactiveFormsModule,
    FormsModule,
    NgSelectModule,
    MatSlideToggleModule,
  ],
})
export class DespesaModule {}
