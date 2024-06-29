import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';
import { UsuarioSistemaFinanceiroService } from 'src/app/services/usuario-sistema.service';

@Component({
  selector: 'sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.scss'],
})
export class SistemaComponent {
  tipoTela: number = 1; //1 listagem, 2 cadastro e 3 edição
  tableListSistemas: Array<SistemaFinanceiro>;
  id: string;
  page: number = 1;
  config: any;
  paginacao: boolean = true;
  itemsPorPagina: number = 10;

  tableListUsuariosSistema: Array<any>;
  id2: string;
  page2: number = 1;
  config2: any;
  paginacao2: boolean = true;
  itemsPorPagina2: number = 10;

  color = 'accent';
  checked = false;
  disabled = false;

  configpag() {
    this.id = this.gerarIdParaConfigDePaginacao();

    this.config = {
      id: this.id,
      currentPage: this.page,
      itemsPerPage: this.itemsPorPagina,
    };

    this.id2 = this.gerarIdParaConfigDePaginacao();

    this.config2 = {
      id: this.id2,
      currentPage: this.page2,
      itemsPerPage: this.itemsPorPagina2,
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

  ListaSistemasUsuario() {
    this.itemEdicao = null;
    this.tipoTela = 1;

    this.sistemaService
      .ListaSistemaUsuario(this.authService.getEmailUser())
      .subscribe((response: Array<SistemaFinanceiro>) => {
        this.tableListSistemas = response;
      }),
      (error) => console.error(error);
  }

  constructor(
    public menuService: MenuService,
    public formBuilder: FormBuilder,
    public sistemaService: SistemaService,
    public authService: AuthService,
    public usuarioSistemaFinancieiroService: UsuarioSistemaFinanceiroService
  ) {}

  sistemaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaSistemasUsuario();

    this.sistemaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      mes: ['', [Validators.required]],
      ano: ['', [Validators.required]],
      diaFechamento: ['', [Validators.required]],
      mesCopia: ['', [Validators.required]],
      anoCopia: ['', [Validators.required]],
    });
  }

  dadosForm() {
    return this.sistemaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    if (this.itemEdicao) {
      this.itemEdicao.nome = dados['name'].value;
      this.itemEdicao.mes = dados['mes'].value;
      this.itemEdicao.ano = dados['ano'].value;
      this.itemEdicao.diaFechamento = dados['diaFechamento'].value;
      this.itemEdicao.gerarCopiaDespesa = this.checked;
      this.itemEdicao.mesCopia = dados['mesCopia'].value;
      this.itemEdicao.anoCopia = dados['anoCopia'].value;
      this.itemEdicao.nomePropriedade = '';
      this.itemEdicao.mensagem = '';
      this.itemEdicao.notificacoes = [];

      this.sistemaService
        .AtualizarSistemaFinanceiro(this.itemEdicao)
        .subscribe((response: SistemaFinanceiro) => {
          this.sistemaForm.reset();
          this.ListaSistemasUsuario();
        }),
        (error) => console.error(error);
    } else {
      let item = new SistemaFinanceiro();
      item.nome = dados['name'].value;
      item.id = 0;
      item.mes = dados['mes'].value;
      item.ano = dados['ano'].value;
      item.diaFechamento = dados['diaFechamento'].value;
      item.gerarCopiaDespesa = this.checked;
      item.mesCopia = dados['mesCopia'].value;
      item.anoCopia = dados['anoCopia'].value;

      this.sistemaService
        .AdicionarSistemaFinanceiro(item)
        .subscribe((response: SistemaFinanceiro) => {
          this.sistemaForm.reset();

          console.log(response.id);

          this.sistemaService
            .CadastraUsuarioNoSistema(
              response.id,
              this.authService.getEmailUser()
            )
            .subscribe((response) => {
              console.log(response);
              this.ListaSistemasUsuario();
            }),
            (error) => console.error(error);
        }),
        (error) => console.error(error);
    }
  }

  cadastro() {
    this.tipoTela = 2;
    this.sistemaForm.reset();
  }

  itemEdicao: SistemaFinanceiro;

  edicao(id: number) {
    this.sistemaService.ObterSistemaFinanceiro(id).subscribe(
      (response: SistemaFinanceiro) => {
        if (response) {
          this.itemEdicao = response;
          this.tipoTela = 2;

          var dados = this.dadosForm();

          dados['name'].setValue(this.itemEdicao.nome);
          dados['mes'].setValue(this.itemEdicao.mes);
          dados['ano'].setValue(this.itemEdicao.ano);
          dados['diaFechamento'].setValue(this.itemEdicao.diaFechamento);
          this.checked = this.itemEdicao.gerarCopiaDespesa;
          dados['mesCopia'].setValue(this.itemEdicao.mesCopia);
          dados['anoCopia'].setValue(this.itemEdicao.anoCopia);

          this.ListarUsuariosSistema();
        }
      },
      (error) => console.error(error),
      () => {}
    );
  }

  mudarPage(event: any) {
    this.page = event;
    this.config.currentPage = this.page;
  }

  mudarPage2(event: any) {
    this.page2 = event;
    this.config2.currentPage = this.page2;
  }

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }

  mudarItemsPorPage2() {
    this.page2 = 1;
    this.config2.currentPage = this.page2;
    this.config2.itemsPerPage = this.itemsPorPagina2;
  }

  handleChageGerarCopiaDespesa(item: any) {
    this.checked = item.checked as boolean;
  }

  emailUsuarioSistema: string = '';
  emailUsuarioSistemaValid: boolean = true;
  textValid: string = 'Campo Obrigatório!';

  ListarUsuariosSistema() {
    this.usuarioSistemaFinancieiroService
      .ListarUsuariosSistema(this.itemEdicao.id)
      .subscribe((response: Array<any>) => {
        this.tableListUsuariosSistema = response;
      }),
      (error) => console.error(error);
  }

  excluir(id: number) {
    this.usuarioSistemaFinancieiroService
      .DeleteUsuarioSistemaFinanceiro(id)
      .subscribe(
        (response: SistemaFinanceiro) => {
          if (response) {
            this.edicao(this.itemEdicao.id);
            this.emailUsuarioSistema = '';
          }
        },
        (error) => console.error(error),
        () => {}
      );
  }

  addUsuarioSistema() {
    this.emailUsuarioSistemaValid = true;

    if (!this.emailUsuarioSistema) {
      this.emailUsuarioSistemaValid = false;
    } else {
      this.usuarioSistemaFinancieiroService
        .CadastraUsuarioNoSistema(this.itemEdicao.id, this.emailUsuarioSistema)
        .subscribe(
          (response: any) => {
            if (response) {
              this.edicao(this.itemEdicao.id);
              this.emailUsuarioSistema = '';
            }
          },
          (error) => console.error(error),
          () => {}
        );
    }
  }
}
