
import { UpdateEmployeeByIdComponent } from './update-employee-by-id.component';


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
  getEmployeeById(id: number = 1): Observable<Employees> {
    let employee: Employees;
    employee = 
      {
        'id' : 1,
        'name' : 'Jay',
        'age' : 45
      };
  return of(employee);
    }
  updateEmployeeById(id, employee): Observable<Employees> {
    if(id==employee.id && employee !=null)
    {return of(employee);}
    else
    {return null;}
  }
}
describe('UpdateEmployeeByIdComponent', () => {
  let component: UpdateEmployeeByIdComponent;
  let fixture: ComponentFixture<UpdateEmployeeByIdComponent>;
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
          UpdateEmployeeByIdComponent
        ],
        providers: [
            EmployeeServiceService,
            {
              provide: EmployeeServiceService,
              useClass: EmployeeServiceMock
            }
    
        ]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(UpdateEmployeeByIdComponent);
        component = fixture.componentInstance; // UserComponent test instance
        de = fixture.debugElement.query(By.css('form'));
        el = de.nativeElement;
        //component.ngOnInit();
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
  expect(component.editForm.valid).toBeFalsy();
});

it('name field validity', () => {
  let errors = {};
  let name = component.editForm.controls['name'];
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
  let age = component.editForm.controls['age'];

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
  component.editForm.controls['name'].setValue('');
  component.editForm.controls['age'].setValue('');
    expect(component.editForm.valid).toBeFalsy();
  }));

  it(`form should be valid`, async(() => {
    component.editForm.controls['name'].setValue('aada');
    component.editForm.controls['age'].setValue('20');
    expect(component.editForm.valid).toBeTruthy();
  }));

  it(`should call the onSubmit method`, async(() => {
    spyOn(component, 'onSubmit').withArgs(component.editForm);
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onSubmit).toHaveBeenCalledTimes(0);//.toHaveBeenCalledWith(component.createForm);
  }));


  it('submitting a form emits a user', () => {
    expect(component.editForm.valid).toBeFalsy();
    component.editForm.controls['name'].setValue("abc");
    component.editForm.controls['age'].setValue("50");
    expect(component.editForm.valid).toBeTruthy();
    spyOn(component, 'onSubmit').withArgs(component.editForm);
    // Subscribe to the Observable and store the user in a local variable.
    let response: Employees;
    spyOn(dataAccessService, 'updateEmployeeById').withArgs(2, component.editForm.value).and.returnValue(of(employee[1]));

    dataAccessService.updateEmployeeById(2, component.editForm.value).subscribe( (res) => {
      response = res;
    });
  
    // Trigger the onSubmit function
   component.onSubmit(component.editForm);
   // Should set submitted to true

   el = fixture.debugElement.query(By.css('button')).nativeElement;
   el.click();
   expect(component.onSubmit).toHaveBeenCalledTimes(1);
   component.submitted= true;
   expect(component.submitted).toBeTruthy();
   expect(component.onSubmit).toHaveBeenCalledWith(component.editForm);
    // Now we can check to make sure the emitted value is correct
    expect(response.name).toBe('abc');
    expect(response.age).toBe(50);
  });

  it(`should have one user`, async(() => {
    let response;
    spyOn(dataAccessService, 'getEmployeeById').withArgs(1).and.returnValue(of(employee[0]));

    dataAccessService.getEmployeeById(1).subscribe(res => {
      response = res;
    });/*
    let placeDebugElement = fixture.debugElement.query(By.css('name'));
    let place = placeDebugElement.componentInstance.name;
   
    expect(place.name).toEqual('Charminar');*/
    expect(response).toEqual(employee[0]);
    expect(response.id).toEqual(1);
    }));

    it(`html should render one user`, (done) => {
      fixture.detectChanges();
      component.id = employee[0].id;
      component.employee = employee[0];
     component.editForm.patchValue(employee);
       fixture.detectChanges();
     //   component.editForm.patchValue(employee);
     //   fixture.detectChanges();
        let response;
        spyOn(dataAccessService, 'getEmployeeById').withArgs(1).and.returnValue(of(employee[0]));

       dataAccessService.getEmployeeById(1).subscribe(res => {
         response = res;
        });
        done();
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('p');
        expect(el.textContent).toContain('Jay');
    });

});

