import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { GetAllEmployeeComponent } from './get-all-employee/get-all-employee.component';
import { UpdateEmployeeByIdComponent } from './update-employee-by-id/update-employee-by-id.component';
import { GetEmployeeByIdComponent } from './get-employee-by-id/get-employee-by-id.component';
import { HttpClientModule } from '@angular/common/http';
import {NgxPaginationModule} from 'ngx-pagination';  
import { Ng2SearchPipeModule } from 'ng2-search-filter';  
import { PageNotFoundComponent } from './Http Error Pages/PageNotFoundComponent';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeServiceService } from './Services/employee-service.service';

@NgModule({
  declarations: [
    AppComponent,
    CreateEmployeeComponent,
    GetAllEmployeeComponent,
    UpdateEmployeeByIdComponent,
    GetEmployeeByIdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,AppRoutingModule,ReactiveFormsModule,
    BrowserAnimationsModule,NgxPaginationModule,Ng2SearchPipeModule  
  ],
  providers: [EmployeeServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
