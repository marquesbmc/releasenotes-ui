import { TicketService } from './services/ticket.service';
import { AuthGuard } from './components/security/auth.guard';

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/security/login/login.component';
import { routes } from './app.routes';
import { UserService } from './services/user.service';
import { SharedService } from './services/shared.service';
import {FormsModule} from '@angular/forms';
import { AuthInterceptor } from './components/security/auth.interceptor';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { DialogService } from './services/dialog.service';
import { UserChangepasswordComponent } from './components/user-changepassword/user-changepassword.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EscapeHtmlPipe } from './util/keep-html.pipe';
import {ToastyModule} from 'ng2-toasty';
import { NrNewComponent } from './components/nr-new/nr-new.component';
import { ReleasenotesListComponent } from './components/releasenotes-list/releasenotes-list.component';
import { ReleasenotesService } from './services/releasenotes.service';
import { ReleasenotesNewComponent } from './components/releasenotes-new/releasenotes-new.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    UserNewComponent,
    UserListComponent,
    UserChangepasswordComponent,
    TicketNewComponent,
    TicketListComponent,
    TicketDetailComponent,
    EscapeHtmlPipe,
    NrNewComponent,
    ReleasenotesListComponent,
    ReleasenotesNewComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    routes,
    ToastyModule.forRoot(),
    AngularFontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [
    UserService, 
    SharedService,
    DialogService,
    TicketService,
    ReleasenotesService,
    AuthGuard,
    
    {
     provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
