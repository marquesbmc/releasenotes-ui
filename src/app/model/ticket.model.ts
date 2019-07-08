import { User } from './user.model';
import { setRootDomAdapter } from '@angular/platform-browser/src/dom/dom_adapter';


export class Ticket {
    constructor(
      public codigo: string,
      public user: User, 
      public dataAbertura: string,
      public dataInstalacao: string,
      public numeroNotaRelease: string, //
      public status: string,
      public assignedUser: User,
      public descricao: string,
      public info: string,
      public changes: Array<string>
    ) {}

    
   



    /*public equals(obj: Ticket) : boolean { 
        return this.number === obj.number;
    } 

      /*public 
     

    public id: string,
        public number: number,
        public title: string,
        public status: string,
        public priority: string,
        public image: string,
        public user: User,
        public assignedUser: User,
        public date: string,
        public changes: Array<string>

    
    */

  }
  