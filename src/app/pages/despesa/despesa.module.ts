import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxPaginationModule } from 'ngx-pagination';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

import { SidebarModule } from './../../components/sidebar/sidebar.module';
import { DespesaRoutingModule } from './despesa-routing.module';
import { DespesaComponent } from './despesa.component';

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
    NgxPaginationModule,
    NgSelectModule,
    MatIconModule,
  ],
})
export class DespesaModule {}
