import { User2 } from './../model/user2.model';

import { User } from './../model/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { HELP_DESK_API } from './helpdesk.api';


@Injectable()
export class UserService {

  constructor(private http:HttpClient
    ) { }
 

  login(user: User){
    return this.http.post(`${HELP_DESK_API}/api/auth`, user);
  }

  createOrUpdate(user: User){
    if(user.codigo != null && user.codigo != ''){
      return this.http.put(`${HELP_DESK_API}/api/user`, user);
    }else{
      user.codigo = null;
      return this.http.post(`${HELP_DESK_API}/api/user`, user);
    }
  }

  findAll(page:number,count:number){
  return this.http.get(`${HELP_DESK_API}/api/user/${page}/${count}`);
  }

  findById(codigo:string){
    return this.http.get(`${HELP_DESK_API}/api/user/${codigo}`);
  }


 delete(codigo:string){
    return this.http.delete(`${HELP_DESK_API}/api/user/${codigo}`);
  }

  changepassword(user: User, passwordnew:string){
    return this.http.put(`${HELP_DESK_API}/api/user/${passwordnew}`, user);
  }
 
}
