import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SistemaRoutingModule } from './sistema-routing.module';
import { SistemaComponent } from './sistema.component';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { SidebarModule } from 'src/app/components/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [SistemaComponent],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    NavbarModule,
    SidebarModule,
    ReactiveFormsModule,

    FormsModule,
    NgxPaginationModule,
    NgSelectModule,
    MatIconModule,
    MatSlideToggleModule,
  ],
})
export class SistemaModule {}
