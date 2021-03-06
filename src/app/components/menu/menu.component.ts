import { SharedService } from './../../services/shared.service';
import { User } from './../../model/user.model';
import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  shared : SharedService;
  
  constructor(){
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
  }

}
