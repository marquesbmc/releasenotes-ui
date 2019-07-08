import { Component, OnInit } from '@angular/core';

import { SharedService } from 'src/app/services/shared.service';
import { Releasenotes } from 'src/app/model/releasenotes.model';
import { DialogService } from 'src/app/services/dialog.service';
import { ReleasenotesService } from 'src/app/services/releasenotes.service';
import { ResponseApi } from 'src/app/model/response-api';
import { Router } from '@angular/router';
import { ToastyService } from 'ng2-toasty';


@Component({
  selector: 'app-releasenotes-list',
  templateUrl: './releasenotes-list.component.html',
  styleUrls: ['./releasenotes-list.component.css']
})
export class ReleasenotesListComponent implements OnInit {


  assignedToMe: boolean = false;
  page: number = 0;
  count: number = 5;
  pages: Array<number>;
  share2: SharedService
  shared: SharedService;
  message: {};
  classCss: {};
  listReleaseNotes = [];
  releaseNotesFilter = new Releasenotes('', '', '', '', '', '', '', '', '', '',null);

  constructor(
    private toasty: ToastyService,
    private dialogService: DialogService,
    private releaseNotesService: ReleasenotesService,
    private router: Router) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    this.findAll(this.page, this.count);
  }


  findAll(page: number, count: number) {
    this.releaseNotesService.findAll(page, count).subscribe((responseApi: ResponseApi) => {
      this.listReleaseNotes = responseApi['data']['content'];
      this.pages = new Array(responseApi['data']['totalPages']);
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }


  filter(): void {
    console.log(' Entrou ', this.releaseNotesFilter);
    this.page = 0;
    this.count = 5;
    this.releaseNotesService.findByParams(this.page, this.count, this.releaseNotesFilter.codigo, this.releaseNotesFilter.nomeSistema, this.releaseNotesFilter.dataCriacao, this.releaseNotesFilter.versaoCodigoFonte, this.releaseNotesFilter.statusNr, this.releaseNotesFilter)
      .subscribe((responseApi: ResponseApi) => {
        this.releaseNotesFilter.codigo = this.releaseNotesFilter.codigo == 'uninformed' ? "" : this.releaseNotesFilter.codigo;
        this.releaseNotesFilter.nomeSistema = this.releaseNotesFilter.nomeSistema == 'uninformed' ? "" : this.releaseNotesFilter.nomeSistema;

        this.releaseNotesFilter.dataCriacao = this.releaseNotesFilter.dataCriacao == 'uninformed' ? "" : this.releaseNotesFilter.dataCriacao;
        this.releaseNotesFilter.versaoCodigoFonte = this.releaseNotesFilter.versaoCodigoFonte == 'uninformed' ? "" : this.releaseNotesFilter.versaoCodigoFonte;
        this.releaseNotesFilter.statusNr = this.releaseNotesFilter.statusNr == 'uninformed' ? "" : this.releaseNotesFilter.statusNr;


        this.listReleaseNotes = responseApi['data']['content'];
        this.pages = new Array(responseApi['data']['totalPages']);
      }, err => {
        this.showMessage({
          type: 'error',
          text: err['error']['errors'][0]
        });
      });
  }

  cleanFilter(): void {
    this.assignedToMe = false;
    this.page = 0;
    this.count = 5;
    this.releaseNotesFilter = new Releasenotes('', '', '', '', '', '', '', '', '', '',null);
    this.findAll(this.page, this.count);
  }

  edit(codigo: string) {
    this.router.navigate(['/releasenotes-new', codigo]);
  }


  detail(codigo: string) {
    this.router.navigate(['/nr-new', codigo]);
  }

  delete(codigo: string) {
    this.dialogService.confirm('Você realmente deseja deletar a Release ' + codigo + '?')
      .then((candelete: boolean) => {
        if (candelete) {
          this.message = {};
          this.releaseNotesService.delete(codigo).subscribe((responseApi: ResponseApi) => {
            this.toasty.success(`Release ${codigo} deletada!`);
            this.findAll(this.page, this.count);
          }, err => {
            var erros = err['error']['errors'][0];
            var erros = erros.substring(0, erros.indexOf(";") + 1);
            this.toasty.error('Falha ao deletar1 : ' + erros);
          }

        
          );
        }
      });
  }


  private showMessage(message: { type: string, text: string }): void {
    this.message = message;
    this.buildClasses(message.type);
    setTimeout(() => {
      this.message = undefined;
    }, 3000);
  }


  private buildClasses(type: string): void {
    this.classCss = {
      'alert': true
    }
    this.classCss['alert-' + type] = true;
  }

  setNextPage(event: any) {
    event.preventDefault();
    if (this.page + 1 < this.pages.length) {
      this.page = this.page + 1;
      this.findAll(this.page, this.count);
    }
  }

  setPreviousPage(event: any) {
    event.preventDefault();
    if (this.page > 0) {
      this.page = this.page - 1;
      this.findAll(this.page, this.count);
    }
  }

  setPage(i, event: any) {
    event.preventDefault();
    this.page = i;
    this.findAll(this.page, this.count);
  }
}
