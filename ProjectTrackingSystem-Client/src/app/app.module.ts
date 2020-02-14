import { ChangePassModalComponent } from './profile/Modals/ChangePassModal/ChangePassModal.component';
import { UserEditModalComponent } from './admin/Modals/UserEditModal/UserEditModal.component';
import { UserAddModalComponent } from './admin/Modals/UserAddModal/UserAddModal.component';
import { UserService } from './_services/user.service';
import { AdminMainComponent } from './admin/AdminMain/AdminMain.component';
import { UploadComponent } from './ProjectTransactions/Upload/Upload.component';
import { TransEventEditModalComponent } from './ProjectTransactions/Modals/TransEventEditModal/TransEventEditModal.component';
import { TransEventAddModalComponent } from './ProjectTransactions/Modals/TransEventAddModal/TransEventAddModal.component';
import { TransactionEventsService } from './_services/transactionEvents.service';
import { TransactionEventsComponent } from './ProjectTransactions/TransactionEvents/TransactionEvents.component';
import { TransactionResolver } from './_resolvers/transactions.resolver';
import { TransEditModalComponent } from './ProjectTransactions/Modals/TransEditModal/TransEditModal.component';
import { TransAddModalComponent } from './ProjectTransactions/Modals/TransAddModal/TransAddModal.component';
import { ProjectTransactionService } from './_services/projectTransaction.service';
import { TransactionMainComponent } from './ProjectTransactions/TransactionMain/TransactionMain.component';
import { WBSEditModalComponent } from './WBSModals/WBSEditModal/WBSEditModal.component';
import { WBSAddModalComponent } from './WBSModals/WBSAddModal/WBSAddModal.component';
import { WBSService } from './_services/WBS.service';
import { ProjectEditModalComponent } from './Project/projectEditModal/projectEditModal.component';
import { ProjectAddModalComponent } from './Project/projectAddModal/projectAddModal.component';
import { ProjectService } from './_services/project.service';
import { ErrorInterceptorProvider } from './_services/error.interceptor';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { AlertifyService } from './_services/alertify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule, ButtonsModule, ModalModule } from 'ngx-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './_services/auth.service';
import { JwtModule } from '@auth0/angular-jwt';
import { NavComponent } from './nav/nav.component';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { ProjectsComponent } from './Project/projects/projects.component';
import { WBSComponent } from './WBS/WBS.component';
import { ProfileComponent } from './profile/ProfileMain/profile.component';


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      HomeComponent,
      NavComponent,
      ProjectsComponent,
      ProjectAddModalComponent,
      ProjectEditModalComponent,
      WBSComponent,
      WBSAddModalComponent,
      WBSEditModalComponent,
      TransactionMainComponent,
      TransAddModalComponent,
      TransEditModalComponent,
      TransactionEventsComponent,
      TransEventAddModalComponent,
      TransEventEditModalComponent,
      UploadComponent,
      AdminMainComponent,
      AdminMainComponent,
      UserAddModalComponent,
      UserEditModalComponent,
      ProfileComponent,
      ChangePassModalComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      PaginationModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      ModalModule.forRoot(),
      BsDropdownModule.forRoot(),
      BsDatepickerModule.forRoot(),
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost:5000'],
           blacklistedRoutes: ['localhost:5000/api/auth']
         }
       })
      //  JwtModule.forRoot({
      //    config: {
      //      tokenGetter,
      //      whitelistedDomains: ['localhost:5000'],
      //      blacklistedRoutes: ['localhost:5000/api/auth']
      //    }
      //  })
   ],
  providers: [
    AuthService,
    AlertifyService,
    AuthGuard,
    ErrorInterceptorProvider,
    ProjectService,
    WBSService,
    ProjectTransactionService,
    TransactionResolver,
    TransactionEventsService,
    UserService
  ],
  entryComponents: [
    ProjectAddModalComponent,
    ProjectEditModalComponent,
    WBSAddModalComponent,
    WBSEditModalComponent,
    TransEditModalComponent,
    TransAddModalComponent,
    TransEventAddModalComponent,
    TransEventEditModalComponent,
    UserAddModalComponent,
    UserEditModalComponent,
    ChangePassModalComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
