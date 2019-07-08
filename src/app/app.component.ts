import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import { ToastyConfig } from 'ng2-toasty';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  showTemplate: boolean = false;
  public shared: SharedService;
  
  constructor(private toastyConfig: ToastyConfig){
    this.toastyConfig.theme = 'bootstrap';
    this.shared = SharedService.getInstance();
  }

  ngOnInit(){
    this.shared.showTemplate.subscribe(
      show => this.showTemplate = show
    );
  }


  showContentWrapper(){
    return {
      'content-wrapper': this.shared.isLoggedIn()
    }

  }

  
}
