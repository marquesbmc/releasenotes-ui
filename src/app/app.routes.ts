
//import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { FooterComponent } from './components/footer/footer.component';
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./components/security/login/login.component";
import { HomeComponent } from './components/home/home.component';
import { ModuleWithProviders } from "@angular/core";
import { AuthGuard } from './components/security/auth.guard';
import { UserNewComponent } from './components/user-new/user-new.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { UserChangepasswordComponent } from './components/user-changepassword/user-changepassword.component';
import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
import { TicketListComponent } from './components/ticket-list/ticket-list.component';
import { TicketDetailComponent } from './components/ticket-detail/ticket-detail.component';
import { NrNewComponent } from './components/nr-new/nr-new.component';
import { ReleasenotesListComponent } from './components/releasenotes-list/releasenotes-list.component';
import {ReleasenotesNewComponent} from './components/releasenotes-new/releasenotes-new.component';
//import { UserNewComponent } from './components/user-new/user-new.component';
//import { UserListComponent } from './components/user-list/user-list.component';
//import { TicketNewComponent } from './components/ticket-new/ticket-new.component';
//import { TicketListComponent } from './components/ticket-list/ticket-list.component';
//import { SummaryComponent } from './components/summary/summary.component';

export const ROUTES: Routes = [
  { path: '' , component:  HomeComponent, canActivate: [AuthGuard]},
  { path: 'login' , component: LoginComponent },
  { path: 'user-new' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-new/:codigo' , component: UserNewComponent, canActivate: [AuthGuard] },
  { path: 'user-list' , component: UserListComponent, canActivate: [AuthGuard] },
  { path: 'user-changepassword' , component: UserChangepasswordComponent, canActivate: [AuthGuard] },
  { path: 'ticket-new' , component: TicketNewComponent, canActivate: [AuthGuard] },
  { path: 'ticket-new/:codigo' , component: TicketNewComponent, canActivate: [AuthGuard] },
  { path: 'ticket-list' , component: TicketListComponent, canActivate: [AuthGuard] },
  { path: 'ticket-detail/:codigo' , component: TicketDetailComponent, canActivate: [AuthGuard] },
  { path: 'nr-new' , component: NrNewComponent, canActivate: [AuthGuard] },
  { path: 'nr-new/:codigo', component: ReleasenotesNewComponent, canActivate: [AuthGuard] },
  { path: 'releasenotes-list',  component: ReleasenotesListComponent, canActivate: [AuthGuard] },
   { path: 'releasenotes-new' , component: ReleasenotesNewComponent, canActivate: [AuthGuard] },
   { path: 'releasenotes-new/:codigo', component: ReleasenotesNewComponent, canActivate: [AuthGuard] },
  // { path: 'releasenotes-new' , component: ReleasenotesNewComponent, canActivate: [AuthGuard] },
  
  //{ path: 'summary' , component: SummaryComponent, canActivate: [AuthGuard] }
  { path: '**' , component: LoginComponent }
]

export const routes: ModuleWithProviders = RouterModule.forRoot(ROUTES);

