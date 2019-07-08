
import { Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/services/shared.service';
import { ResponseApi } from 'src/app/model/response-api';
import { User } from 'src/app/model/user.model';
import { NgForm, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-changepassword',
  templateUrl: './user-changepassword.component.html',
  styleUrls: ['./user-changepassword.component.css']
})
export class UserChangepasswordComponent implements OnInit {

  @ViewChild("form")
  form: NgForm

  user = new User('','','','','','');
  user2 = new User('','','','','','');
  shared : SharedService;
  message : {};
  classCss : {};
   

  constructor(
    
    private userService: UserService,
    private route: ActivatedRoute) { 
      this.shared = SharedService.getInstance();
  }

  ngOnInit() {
    let codigo:string = this.route.snapshot.params['codigo'];
    if(codigo != undefined){
      this.findById(codigo);
    }
    this.user = this.shared.user;
  }

  findById(codigo:string){
    this.userService.findById(codigo).subscribe((responseApi:ResponseApi) => {
      this.user = responseApi.data;
      this.user.password = '';
  } , err => {
    this.showMessage({
      type: 'error',
      text: err['error']['errors'][0]
    });
  });
  }

  changepassword(){
    this.message = {};

    this.userService.changepassword(this.user,this.user2.password).subscribe((responseApi:ResponseApi) => {
        
        let userRet : User = responseApi.data;
        this.reload(this.form);
        this.showMessage({
          type: 'success',
          text: `${userRet.matricula}, senha Alterada com sucesso! `
        });
     

    } , err => {
      this.showMessage({
    type: 'error',
       text: err['error']['errors'][0]
      });
    });
  }

  reload(form:NgForm){
    form.reset({
      matricula:this.user.matricula,
      nome:this.user.nome,
      coordenacao:this.user.coordenacao,
      profile:this.user.profile,
      password: '',
      passwordnew:''
    });
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