import { Msg } from 'src/app/model/msg.model';
import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { HELP_DESK_API } from './helpdesk.api';
import { Ticket } from '../model/ticket.model';
import { JsonPipe } from '@angular/common';

@Injectable()
export class TicketService {

  constructor(private http: HttpClient) {}

  createOrUpdate(ticket: Ticket){
    console.log(ticket.codigo);
    if(ticket.codigo != null && ticket.codigo != ''){
      
      return this.http.put(`${HELP_DESK_API}/api/ticket`,ticket);
    } else {
      ticket.codigo = null;
      ticket.status = 'Novo';
      return this.http.post(`${HELP_DESK_API}/api/ticket`, ticket);
    }
  }

  createOrUpdate2(ticket: Ticket){
    console.log(ticket.codigo);
    
      
      return this.http.put(`${HELP_DESK_API}/api/ticket`,ticket);
    
  }

  findAll(page:number,count:number){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}`);
  }

  findById(id:string){
    return this.http.get(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  delete(id:string){
    return this.http.delete(`${HELP_DESK_API}/api/ticket/${id}`);
  }

  findByParams(page:number,count:number,assignedToMe:boolean,t:Ticket){
   // t.number = t.number == null ? 0 : t.number;
    t.numeroNotaRelease = t.numeroNotaRelease == '' ? "uninformed" : t.numeroNotaRelease;
    t.status = t.status == '' ? "uninformed" : t.status;
    return this.http.get(`${HELP_DESK_API}/api/ticket/${page}/${count}/${t.numeroNotaRelease}/${t.status}/${assignedToMe}`);
  } 

 /*changeStatus(status:string,ticket:Ticket){
    return this.http.put(`${HELP_DESK_API}/api/ticket/${ticket.codigo}/${status}`,ticket);
  }*/

  changeStatus(status:string, ticket:Ticket){
    return this.http.put(`${HELP_DESK_API}/api/ticket/${ticket.codigo}/${status}/`, ticket);
  }



  summary(){
    return this.http.get(`${HELP_DESK_API}/api/ticket/summary`);
  }

}