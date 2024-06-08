import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SistemaFinanceiro } from 'src/app/models/SistemaFinanceiro';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { SistemaService } from 'src/app/services/sistema.service';

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
    public authService: AuthService
  ) {}

  sistemaForm: FormGroup;

  ngOnInit() {
    this.menuService.menuSelecionado = 2;

    this.configpag();
    this.ListaSistemasUsuario();

    this.sistemaForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    });
  }

  dadosForm() {
    return this.sistemaForm.controls;
  }

  enviar() {
    var dados = this.dadosForm();

    if (this.itemEdicao) {
      this.itemEdicao.nome = dados['name'].value;
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
      item.mes = 0;
      item.ano = 0;
      item.diaFechamento = 0;
      item.gerarCopiaDespesa = true;
      item.mesCopia = 0;
      item.anoCopia = 0;

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

  mudarItemsPorPage() {
    this.page = 1;
    this.config.currentPage = this.page;
    this.config.itemsPerPage = this.itemsPorPagina;
  }
}
