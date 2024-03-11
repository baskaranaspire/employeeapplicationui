

import { CreateEmployeeComponent } from './create-employee.component';


import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 

import { BrowserModule, By } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHandler, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { MockBackend } from "@angular/http/testing"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

//import { DataAccessService, CalculationsService } from "./data-access.service";
//import { Traveller } from "./traveller";
import { Employees } from '../Models/Employee';
import { EmployeeServiceService } from '../Services/employee-service.service';

import { BaseRequestOptions } from '@angular/http';
import { DebugElement } from '@angular/core';

export class EmployeeServiceMock {
  createEmployee(employee): Observable<Employees> {
  return of(employee);
  }
}
describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let fixture: ComponentFixture<CreateEmployeeComponent>;
  let dataAccessService: EmployeeServiceService;
  let employee: Employees[];
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule,BrowserModule,
        FormsModule,
        ReactiveFormsModule],
        declarations: [
          CreateEmployeeComponent
        ],
        providers: [
            EmployeeServiceService,
            {
              provide: EmployeeServiceService,
              useClass: EmployeeServiceMock
            }
    
        ]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(CreateEmployeeComponent);
        component = fixture.componentInstance; // UserComponent test instance
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
        component.ngOnInit();
        //fixture.detectChanges();
    });

  
    employee = [
      {
        'id' : 1,
        'name' : 'Jay',
        'age' : 45
      },
      {
        'id' : 2,
        'name' : 'abc',
        'age' : 50
      },
    ];

    

}));

beforeEach(inject([EmployeeServiceService], (service: EmployeeServiceService) => {
  dataAccessService = service;
}));

it('form invalid when empty', () => {
  expect(component.createForm.valid).toBeFalsy();
});

it('name field validity', () => {
  let errors = {};
  let name = component.createForm.controls['name'];
  expect(name.valid).toBeFalsy();

  // Email field is required
  errors = name.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set email to something
  name.setValue("test");
  errors = name.errors || {};
  expect(errors['required']).toBeFalsy();

});

it('age field validity', () => {
  let errors = {};
  let age = component.createForm.controls['age'];

  // Email field is required
  errors = age.errors || {};
  expect(errors['required']).toBeTruthy();

  // Set email to something
  age.setValue('121');
  errors = age.errors || {};
  expect(errors['required']).toBeFalsy();
  expect(errors['maxlength']).toBeTruthy();

  // Set email to something correct
  age.setValue('12');
  errors = age.errors || {};
  expect(errors['required']).toBeFalsy();
  expect(errors['maxlength']).toBeFalsy();
});



  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
  it(`should have as text 'contact page'`, async(() => {
    expect(component.text).toEqual('contact page');
  }));*/


 it(`form should be invalid`, async(() => {
  component.createForm.controls['name'].setValue('');
  component.createForm.controls['age'].setValue('');
    expect(component.createForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.createForm.controls['name'].setValue('aada');
    component.createForm.controls['age'].setValue('20');
    expect(component.createForm.valid).toBeTruthy();
  }));

  it(`should call the onSubmit method`, async(() => {
    spyOn(component, 'onSubmit').withArgs(component.createForm);
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);//.toHaveBeenCalledWith(component.createForm);
  }));


  it('submitting a form emits a user', () => {
    expect(component.createForm.valid).toBeFalsy();
    component.createForm.controls['name'].setValue("Jay");
    component.createForm.controls['age'].setValue("45");
    expect(component.createForm.valid).toBeTruthy();
    spyOn(component, 'onSubmit').withArgs(component.createForm);
    // Subscribe to the Observable and store the user in a local variable.
    let response: Employees;
    spyOn(dataAccessService, 'createEmployee').withArgs(component.createForm.value).and.returnValue(of(employee[0]));

    dataAccessService.createEmployee(component.createForm.value).subscribe( (res) => {
      response = res;
    });
  
    // Trigger the onSubmit function
   component.onSubmit(component.createForm);
   // Should set submitted to true

   el = fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.onSubmit).toHaveBeenCalledTimes(1);
   component.submitted= true;
   expect(component.submitted).toBeTruthy();
   expect(component.onSubmit).toHaveBeenCalledWith(component.createForm);
    // Now we can check to make sure the emitted value is correct
    expect(response.name).toBe('Jay');
    expect(response.age).toBe(45);
  });

  //  it(`should have one user`, async(() => {
  //  let response;
 //   spyOn(dataAccessService, 'createEmployee').withArgs(employee[0]).and.returnValue(of(employee[0]));

 //   dataAccessService.createEmployee(employee[0]).subscribe(res => {
 //     response = res;
 //   });/*
  //  let placeDebugElement = fixture.debugElement.query(By.css('name'));
 //   let place = placeDebugElement.componentInstance.name;
   
 //   expect(place.name).toEqual('Charminar');*/
 //   expect(response).toEqual(employee[0]);
   // expect(component.createForm).toEqual(1);
 //   }));
/*
    it(`html should render one user`, async(() => {
     // component.id = employee[0].id;
     // component.employee = employee[0];
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('ul');
        expect(el.innerText).toContain('Jay');
        expect(el.innerText).toContain('45');
    }));*/

});

