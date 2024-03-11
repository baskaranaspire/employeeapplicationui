
import { TestBed, async, inject, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing'; 


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
import { GetEmployeeByIdComponent } from './get-employee-by-id.component';
import { By } from '@angular/platform-browser';
import { BaseRequestOptions } from '@angular/http';
export class EmployeeServiceMock {
  getEmployeeById(id): Observable<Employees> {
    let employee: Employees;
    employee = 
      {
        'id' : 1,
        'name' : 'Jay',
        'age' : 45
      };
  return of(employee);
  }
}
describe('GetEmployeeByIdComponent', () => {
  let component: GetEmployeeByIdComponent;
  let fixture: ComponentFixture<GetEmployeeByIdComponent>;
  let dataAccessService: EmployeeServiceService;
  let employee: Employees[];


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,RouterTestingModule],
        declarations: [
          GetEmployeeByIdComponent
        ],
        providers: [
            EmployeeServiceService,
            {
              //provide: HttpClient,
              //useFactory: (backend) => new HttpClient(handler: HttpHandler),
              //deps: [HttpHandler]
              provide: EmployeeServiceService,
              useClass: EmployeeServiceMock
            }
    
        ]
    }).compileComponents().then(() => {
        fixture = TestBed.createComponent(GetEmployeeByIdComponent);
        component = fixture.componentInstance; // UserComponent test instance
        fixture.detectChanges();
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

  it('should create', () => {
    expect(component).toBeTruthy();
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
    expect(component.employee.id).toEqual(1);
    }));

    it(`html should render one user`, async(() => {
      component.id = employee[0].id;
      component.employee = employee[0];
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('ul');
        expect(el.innerText).toContain('Jay');
        expect(el.innerText).toContain('45');
    }));

});
