import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeServiceService } from '../Services/employee-service.service';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  createForm: FormGroup;
  submitted: boolean;
 
  constructor(
    public employeeServiceService: EmployeeServiceService,
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.submitted = false;
    this.createForm = this.formBuilder.group({
      name: ['', Validators.required],
      age: ['', [
        Validators.required,
        Validators.maxLength(2)]],
    });
  }
 
  ngOnInit(): void {

  }
 
  onSubmit(formData) {
    this.submitted = true;
    this.employeeServiceService.createEmployee(formData.value).subscribe(res => {
      this.router.navigateByUrl('/Employee/list');
    });
  }
}
