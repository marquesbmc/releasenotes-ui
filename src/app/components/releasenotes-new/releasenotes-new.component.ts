import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SharedService } from 'src/app/services/shared.service';
import { Releasenotes } from 'src/app/model/releasenotes.model';
import { ActivatedRoute } from '@angular/router';
import { ReleasenotesService } from 'src/app/services/releasenotes.service';
import { ToastyService } from 'ng2-toasty';
import { ResponseApi } from 'src/app/model/response-api';
import { Team } from 'src/app/model/team.model';

@Component({
  selector: 'app-releasenotes-new',
  templateUrl: './releasenotes-new.component.html',
  styleUrls: ['./releasenotes-new.component.css']
})
export class ReleasenotesNewComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

listTeamInput= new Array<Team>() ;


//listTeam: Team[] = [{codigo:"",nome:"",matricula:"",papel:""}];
  releasenotes = new Releasenotes('', '', '', '', '', '', '', '', '', '',  new Array<Team>());
  
  shared: SharedService;

  message: {};
  classCss: {};
  listteammatricula: string;
  

  constructor(
    private releaseNotesService: ReleasenotesService,
    private toasty: ToastyService,
    private route: ActivatedRoute
  ) {
    this.shared = SharedService.getInstance();
  }



  ngOnInit() {
    let codigo: string = this.route.snapshot.params['codigo'];
    if (codigo != undefined) {
      this.findById(codigo);
     
    }
  }

  findById(codigo: string) {
    this.releaseNotesService.findById(codigo).subscribe((responseApi: ResponseApi) => {
      this.releasenotes = responseApi.data;
      console.log('roda aqui')
    
    }, err => {
      this.showMessage({
        type: 'error',
        text: err['error']['errors'][0]
      });
    });
  }



  register() {
    this.releaseNotesService.createOrUpdate(this.releasenotes).subscribe((responseApi: ResponseApi) => {
      this.releasenotes = new Releasenotes('', '', '', '', '', '', '', '', '', '',null);
      let releasenotes: Releasenotes = responseApi.data;
      this.form.resetForm();
      this.toasty.success(`Release:${releasenotes.codigo} registrado  com sucesso!`);
    }, err => {
      var erros = err['error']['errors'][0];
      var erros = erros.substring(0, erros.indexOf(";") + 1);
      if (erros == 'could not execute statement;') {
        this.toasty.error('Falha ao registrar : ' + erros);
      } else {
        this.toasty.error('Falha complexa registrar : ' + erros);
      }
    }
    );
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


  getFormGroupClass(isInvalid: boolean, isDirty: boolean): {} {
    return {
      'form-group': true,
      'has-error': isInvalid && isDirty,
      'has-success': !isInvalid && isDirty
    };
  }
  
  

  

  salvarListaTeam(form: NgForm):void {
    
  this.releasenotes.listteam.push({
        codigo: null,
        nome: this.form.value.listteamnome,
        matricula: this.form.value.listteamnome,
      papel: this.form.value.listteampapel
      
      });
     
    this.listTeamInput = new Array<Team>();
    
    console.warn(this.releasenotes);
   
 
   //form.resetForm(); 
    

  }

  abrirCadListaTeam(form: NgForm):void{
   
    this.form.getControl(this.form.value.ppapel) ; 
  }

  excluirListaTeam(codigo: string) {
    let cont = 0;
    for (var index in this.releasenotes.listteam) {
     if (this.releasenotes.listteam[index].codigo==codigo) {
        var removed = this.releasenotes.listteam.splice(cont, 1);
     }
      cont++;
    }
   //this.salvarListaTeam;
  }

 
}
