import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Categoria } from 'src/app/models/Categoria';
import { SelectModel } from 'src/app/models/SelectModel';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { CategoriaService } from 'src/app/services/categoria.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.scss'],
})
export class CategoriaComponent {
  tipoTela: number = 1; //1 listagem, 2 cadastro e 3 edição
  tableListCategorias: Array<Categoria>;
  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina,
    };
  }

  gerarIdParaConfigDePaginacao() {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  ListaCategoriaUsuario() {
    this.tipoTela = 1;

    this.categoriaService
      .ListaCategoriaUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<Categoria>) => {
        this.tableListCategorias = response;
      }),
      (error) => console.error(error);
  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    public authService: AuthService,
    public categoriaService: CategoriaService
  ) {}
  listSistemas = new Array<SelectModel>();
  sistemaSelect = new SelectModel();
  categoriaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 3;

    this.configpag();
    this.ListaCategoriaUsuario();

    this.categoriaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      sistemaSelect: ['', [Validators.required]],
    });

    this.ListaSistemasUsuario();
  }

  dadosForm() {
    return this.categoriaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();
    let item = new Categoria();
    item.nome = dados['name'].value;
    item.id = 0;
    item.idSistema = parseInt(this.sistemaSelect.id);

    this.categoriaService
      .AdicionarCategoria(item)
      .subscribe((response: Categoria) => {
        this.categoriaForm.reset();
        this.ListaCategoriaUsuario();
      }),
      (error) => console.error(error);
  }

  ListaSistemasUsuario() {
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

  cadastro() {
    this.tipoTela = 2;
    this.categoriaForm.reset();
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }
}
