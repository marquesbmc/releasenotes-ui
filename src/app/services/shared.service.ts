import { User } from './../model/user.model';

import { Injectable, EventEmitter } from '@angular/core';
import { } from '@angular/core/src/event_emitter'

//Guardar usuario logado
@Injectable()
export class SharedService {

  public static instance: SharedService = null;
  user : User;
  token: string;
 //sumir na tela de login
  showTemplate = new EventEmitter<boolean>();

  constructor() { 
    return SharedService.instance = SharedService.instance || this;
  }

  //manter estado no front
  public static getInstance(){
    if(this.instance == null){
      this.instance = new SharedService();
    }
    return this.instance;
  }

  isLoggedIn():boolean {
    if(this.user == null){
      return false;
    }
    return this.user.matricula != '';
  }

}
