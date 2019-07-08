import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Releasenotes } from '../model/releasenotes.model';
import { HELP_DESK_API } from './helpdesk.api';

@Injectable()
export class ReleasenotesService {

  constructor(private http: HttpClient) { }


  createOrUpdate(releasenotes: Releasenotes) {
    console.log(releasenotes.codigo);
    if (releasenotes.codigo != null && releasenotes.codigo != '') {

      return this.http.put(`${HELP_DESK_API}/api/releasenotes`, releasenotes);
    } else {
      releasenotes.codigo = null;
      releasenotes.statusNr = 'Novo';
      return this.http.post(`${HELP_DESK_API}/api/releasenotes`, releasenotes);
    }
  }

  createOrUpdate2(releasenotes: Releasenotes) {
    console.log(releasenotes.codigo);
    return this.http.put(`${HELP_DESK_API}/api/releasesnotes`, releasenotes);
  }

  findAll(page: number, count: number) {
    return this.http.get(`${HELP_DESK_API}/api/releasenotes/${page}/${count}`);

  }

  findById(codigo: string) {
    return this.http.get(`${HELP_DESK_API}/api/releasenotes/${codigo}`);
  }

  delete(codigo: string) {
    return this.http.delete(`${HELP_DESK_API}/api/releasenotes/${codigo}`);
  }


  findByParams(page: number, count: number, codigo: string, nomeSistema: string, dataCriacao: string, versaoCodigoFonte: string, statusNr: string, t: Releasenotes) {

    t.codigo = t.codigo == '' ? "uninformed" : t.codigo;
    t.nomeSistema = t.nomeSistema == '' ? "uninformed" : t.nomeSistema;
    t.dataCriacao = t.dataCriacao == '' ? "uninformed" : t.dataCriacao;
    t.versaoCodigoFonte = t.versaoCodigoFonte == '' ? "uninformed" : t.versaoCodigoFonte;
    t.statusNr = t.statusNr == '' ? "uninformed" : t.statusNr;



    return this.http.get(`${HELP_DESK_API}/api/releasenotes/${page}/${count}/${t.codigo}/${t.nomeSistema}/${t.dataCriacao}/${t.versaoCodigoFonte}/${t.statusNr}`);
  }

  changeStatus(status: string, releasenotes: Releasenotes) {
    return this.http.put(`${HELP_DESK_API}/api/releasenotes/${releasenotes.codigo}/${status}/`, releasenotes);
  }




}
