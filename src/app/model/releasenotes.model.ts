import { Team } from "./team.model";

export class Releasenotes {
    constructor(
      public codigo: string ,
      public nomeSistema: string,
      public dataCriacao: string,
      public tipoDeploy: string,
      public ambienteDeploy: string,
      public versaoCodigoFonte: string,
      public versaoCodigoCompilado: string,
      public nomeCoordTi: string,
      public nomeCoordProjeto: string,
      public statusNr: string,
      public listteam: Array<Team> = []
     
    ) {}
 }