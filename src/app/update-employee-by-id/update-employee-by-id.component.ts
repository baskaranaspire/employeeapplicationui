import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employees } from '../Models/Employee';
import { EmployeeServiceService } from '../Services/employee-service.service';

@Component({
  selector: 'app-update-employee-by-id',
  templateUrl: './update-employee-by-id.component.html',
  styleUrls: ['./update-employee-by-id.component.css']
})
export class UpdateEmployeeByIdComponent implements OnInit {

  id: number;
  employee: Employees;
  editForm: FormGroup;
  submitted: boolean;
 
  constructor(
    public employeeServiceService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.submitted = false;
    this.editForm = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      age: ['', [
        Validators.required,
        Validators.maxLength(2)]],
    });
  }
 
  ngOnInit(): void {
    this.submitted = false;
    this.id = this.route.snapshot.params['EmployeeId'];
    this.employeeServiceService.getEmployeeById(this.id).subscribe((data: Employees) => {
      this.employee = data;
      this.editForm.patchValue(data);
    });
  }
 
  onSubmit(formData) {
    this.submitted = true;
    this.employeeServiceService.updateEmployeeById(this.id, formData.value).subscribe(res => {
      this.router.navigateByUrl('/Employee/list');
    });
  }
}
