import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { GetAllEmployeeComponent } from './get-all-employee/get-all-employee.component';
import { GetEmployeeByIdComponent } from './get-employee-by-id/get-employee-by-id.component';
import { PageNotFoundComponent } from './Http Error Pages/PageNotFoundComponent';
import { UpdateEmployeeByIdComponent } from './update-employee-by-id/update-employee-by-id.component';

export const routes: Routes = [
  { path: '', redirectTo: 'Employee/list', pathMatch: 'full' }, 
  { path: 'Employee', redirectTo: 'Employee/list', pathMatch: 'full' },
  { path: 'Employee/list', component: GetAllEmployeeComponent },
  { path: 'Employee/:EmployeeId/details', component: GetEmployeeByIdComponent },
  { path: 'Employee/create', component: CreateEmployeeComponent },
  { path: 'Employee/:EmployeeId/edit', component: UpdateEmployeeByIdComponent },
  { path: '**', component: PageNotFoundComponent } 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
