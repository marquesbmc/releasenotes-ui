import { ResponseApi } from './../../model/response-api';
import { ActivatedRoute } from '@angular/router';

import { SharedService } from './../../services/shared.service';
import { NgForm } from '@angular/forms';

import { Component, OnInit, ViewChild } from '@angular/core';
import { Ticket } from 'src/app/model/ticket.model';
import { TicketService } from 'src/app/services/ticket.service';
import { Msg } from 'src/app/model/msg.model';
import { ToastyService } from 'ng2-toasty';


@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.css']
})
export class TicketDetailComponent implements OnInit {

  @ViewChild("form")
  form: NgForm;

  ticket = new Ticket('', null, '', '', '', '', null, '', null, null);
  shared: SharedService;
  message: {};
  classCss: {};

  constructor(
    private ticketService: TicketService,
    private toasty: ToastyService,
    private route: ActivatedRoute) {
    this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let codigo: string = this.route.snapshot.params['codigo'];
    if (codigo != undefined) {
      this.findById(codigo);
    }
  }

  findById(codigo: string) {
    console.log('codigo --> ', codigo);
    this.ticketService.findById(codigo).subscribe((responseApi: ResponseApi) => {
      console.log('responseApi -->  ', responseApi);
      this.ticket = responseApi.data;
      this.ticket.dataAbertura = new Date(this.ticket.dataAbertura).toISOString();

    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  register() {
    this.message = {};
    this.ticketService.createOrUpdate(this.ticket).subscribe((responseApi: ResponseApi) => {
      this.ticket = new Ticket('', null, '', '', '', '', null, '', null, null);
      let ticket: Ticket = responseApi.data;
      this.form.resetForm();
      this.showMessage({
        type: 'success',
        text: `Registered ${ticket.numeroNotaRelease} successfully`
      });
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }

  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
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

  /* onFileChange(event): void{
     if(event.target.files[0].size > 2000000){
       this.showMessage({
         type: 'error',
         text: 'Maximum image size is 2 MB'
       });
     } else {
       this.ticket.image = '';
       var reader = new FileReader();
       reader.onloadend = (e: Event) => {
           this.ticket.image = reader.result;
       }
       reader.readAsDataURL(event.target.files[0]);
     }
   } 
 
 */


  changeStatus(status: string, msg: any): void {
    this.ticket.info = msg;
    this.ticketService.changeStatus(status, this.ticket).subscribe((responseApi: ResponseApi) => {
      console.log('responseApi.data: ', responseApi.data);
      this.ticket = responseApi.data;
      this.ticket.dataAbertura = new Date(this.ticket.dataAbertura).toISOString();
      this.ngOnInit();
      //this.toasty.default({ title: "Toast It!", msg: "Mmmm, tasties..." });
      //this.toasty.info({ title: "Toast It!", msg: "Mmmm, tasties..." });
      this.toasty.success({ title: "Alteração de Escopo!", msg: "Status alterado para: " + status });
      //this.toasty.wait({ title: "Toast It!", msg: "Mmmm, tasties..." });

      //this.toasty.warning({ title: "Toast It!", msg: "Mmmm, tasties..." });
      //this.toasty.error({ title: "Toast It!", msg: "Mmmm, tasties..." });

    }, err => {
      var erros = err['error']['errors'][0];
      var erros = erros.substring(0, erros.indexOf(";") + 1);
      if (erros == 'could not execute statement;') {
        this.toasty.error('Falha ao registrar : ' + erros);
      }
      else {
        this.toasty.error('Falha complexa registrar : ');
      }
    });
  }






}



