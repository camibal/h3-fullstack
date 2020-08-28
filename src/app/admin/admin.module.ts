import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserComponent } from './user/user.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { HomeComponent } from './home/home.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SaveUserComponent } from './user/save-user/save-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from '../services/auth.interceptor';
import { UpdateUserComponent } from './user/update-user/update-user.component';


@NgModule({
  declarations: [
    AdminComponent,
    UserComponent,
    InvoicesComponent,
    HomeComponent,
    SaveUserComponent,
    DeleteUserComponent,
    UpdateUserComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
})
export class AdminModule { }
