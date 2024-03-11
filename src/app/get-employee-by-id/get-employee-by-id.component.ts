import { Component, OnInit } from '@angular/core';
import { Employees } from '../Models/Employee';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-get-employee-by-id',
  templateUrl: './get-employee-by-id.component.html',
  styleUrls: ['./get-employee-by-id.component.css']
})
export class GetEmployeeByIdComponent implements OnInit {

  id: number;
  employee: Employees;
 
  constructor(
    public employeeServiceService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) { }
 
  ngOnInit(): void {
    this.id = this.route.snapshot.params['EmployeeId'];
    this.employeeServiceService.getEmployeeById(this.id).subscribe((data: Employees) => {
      this.employee = data;
    });
  }

}
