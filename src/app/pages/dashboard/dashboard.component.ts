import { Component } from '@angular/core';
import { ObjetoGraficoModel } from 'src/app/models/ObjetoGraficoModel';
import { AuthService } from 'src/app/services/auth.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  constructor(
    public menuService: MenuService,
    public despesaService: DespesaService,
    public authService: AuthService,
    public sistemaService: SistemaService
  ) {}
  ngOnInit() {
    this.menuService.menuSelecionado = 1;
    this.CarregaGraficos();
  }

  objetoGrafico: ObjetoGraficoModel;

  CarregaGraficos() {
    this.despesaService
      .CarregaGraficos(this.authService.getEmailUser())
      .subscribe(
        (response: any) => {
          this.objetoGrafico = response;
        },
        (error) => console.log(error),
        () => {}
      );
  }

  ExecuteCopiaDespesasSistemaFinanceiro = () => {
    this.sistemaService
      .ExecuteCopiaDespesasSistemaFinanceiro()
      .subscribe((response: any) => {
        alert('Executado com Sucesso!');

        this.CarregaGraficos();
      });
  };
}
