import { User } from './user.model';



export class Nr {
    constructor(
      public codigo: string,
      public tipoDeploy: string, 
      public ambienteDeploy: string,
      public nomeSistema: string,
      public versaoCodigoFonte: string, 
      public versaoCodigoCompilado: string) { }
    }


    