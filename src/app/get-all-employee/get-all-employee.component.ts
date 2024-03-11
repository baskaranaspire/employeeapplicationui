import { Component, OnInit } from '@angular/core';
import { Employees } from '../Models/Employee';
import { EmployeeServiceService } from '../Services/employee-service.service';

@Component({
  selector: 'app-get-all-employee',
  templateUrl: './get-all-employee.component.html',
  styleUrls: ['./get-all-employee.component.css']
})
export class GetAllEmployeeComponent implements OnInit {

  employees: Employees[] = [];
  p : number = 1;
  constructor(public employeeServiceService: EmployeeServiceService) { }
 
  ngOnInit(): void {
    this.employeeServiceService.getAllEmployee().subscribe((data: Employees[]) => {
      this.employees = data;
    });
  }
 
  deletePlayer(id) {
    this.employeeServiceService.deleteEmployeeById(id).subscribe(res => {
      this.employees = this.employees.filter(item => item.id !== id);
    });
  }
}
