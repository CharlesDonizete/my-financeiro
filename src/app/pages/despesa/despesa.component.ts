import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { Despesa } from 'src/app/models/Despesa';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { DespesaService } from 'src/app/services/despesa.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-despesa',
  templateUrl: './despesa.component.html',
  styleUrls: ['./despesa.component.scss'],
})
export class DespesaComponent {
  [x: string]: any;
  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    public categoriaService: CategoriaService,
    public authService: AuthService,
    public despesaService: DespesaService
  ) {}
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  listCategorias = new Array<SelectModel>();
  categoriaSelect = new SelectModel();
  despesaForm: FormGroup;

  color = 'accent';
  checked = false;
  disabled = false;

  ngOnInit() {
    this.menuService.menuSelecionado = 4;

    this.despesaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      data: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],
      categoriaSelect: ['', [Validators.required]],
      pago: ['', [Validators.required]],
    });

    this.ListarCategoriasUsuario();
    this.ListarSistemasUsuario();
  }

  dadosForm() {
    return this.despesaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();
    debugger;
    let item = new Despesa();
    item.nome = dados['name'].value;
    item.valor = dados['valor'].value;
    item.dataVencimento = dados['data'].value;
    item.id = 0;
    item.idCategoria = parseInt(this.categoriaSelect.id);
    item.pago = this.checked;

    this.despesaService
      .AdicionarDespesa(item)
      .subscribe((response: Despesa) => {
        this.despesaForm.reset();
      }),
      (error) => console.error(error);
  }

  ListarCategoriasUsuario() {
    this.categoriaService
      .ListaCategoriaUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Categoria>) => {
        var listCategoria = [];

        response.forEach((x) => {
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.nome;

          listCategoria.push(item);
        });

        this.listCategorias = listCategoria;
      });
  }

  ListarSistemasUsuario() {
    this.sistemaService
      .ListaSistemaUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<SistemaFinanceiro>) => {
        var listSistemaFinanceiro = [];

        response.forEach((x) => {
          var item = new SelectModel();
          item.id = x.id.toString();
          item.name = x.nome;

          listSistemaFinanceiro.push(item);
        });

        this.listSistemas = listSistemaFinanceiro;
      });
  }

  handleChagePago(item: any) {
    this.checked = item.checked as boolean;
  }
}
