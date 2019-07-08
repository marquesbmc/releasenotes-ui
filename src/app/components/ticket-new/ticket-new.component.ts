import { ActivatedRoute } from '@angular/router';
import { TicketService } from './../../services/ticket.service';
import { SharedService } from 'src/app/services/shared.service';
import { Ticket } from './../../model/ticket.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ResponseApi } from 'src/app/model/response-api';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-ticket-new',
  templateUrl: './ticket-new.component.html',
  styleUrls: ['./ticket-new.component.css']
})
export class TicketNewComponent implements OnInit {

  @ViewChild("form")
  form:NgForm

  

  ticket = new Ticket('', null, '',  '', '',  '', null, '', null, null);

  shared: SharedService;

  message : {};
  classCss: {};

  constructor(
    private ticketService: TicketService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) {
    this.shared= SharedService.getInstance();
   }

  ngOnInit() {
    let codigo:string = this.route.snapshot.params['codigo'];
    if(codigo != undefined){
      this.findById(codigo);
    }
  }

  findById(codigo:string){
    this.ticketService.findById(codigo).subscribe((responseApi:ResponseApi) => {
      this.ticket = responseApi.data;
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  register(){
        this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi:ResponseApi) => {
        this.ticket = new Ticket('', null, '',  '', '',  '', null, '', null, null)
        let ticket : Ticket = responseApi.data;
        this.form.resetForm();
        this.toasty.success(`Ticket:${ticket.codigo} registrado  com sucesso!`);
    } , err => {
      var erros = err['error']['errors'][0];
      var erros = erros.substring(0,erros.indexOf(";") + 1);
      if (erros == 'could not execute statement;') 
      {
        this.toasty.error('Falha ao registrar : '+ erros);
      }else {
        this.toasty.error('Falha complexa registrar : ');
      }}
      );
  }

  
  




  getFormGroupClass(isInvalid: boolean, isDirty:boolean): {} {
    return {
      'form-group': true,
      'has-error' : isInvalid  && isDirty,
      'has-success' : !isInvalid  && isDirty
    };
  }

  private showMessage(message: {type: string, text: string}): void {
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
     this.classCss['alert-'+type] =  true;
  }

}
