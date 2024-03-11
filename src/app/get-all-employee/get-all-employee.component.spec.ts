

import { GetAllEmployeeComponent } from './get-all-employee.component';
import { async,ComponentFixture, fakeAsync, inject, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { NgxPaginationModule } from 'ngx-pagination';
import { of,Observable} from 'rxjs';

import { Employees } from '../Models/Employee';
import { EmployeeServiceService } from '../Services/employee-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';

export const employeesList = [
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

export class EmployeeServiceMock {
  getAllEmployee(): Observable<Employees[]> 
  {
  let employee:Employees[];

    employee = [
      {
        'id' : 1,
        'name' : 'Jay',
        'age' : 45
      },
    ];
  return of(employee);
  }
  deleteEmployeeById(id: number){
    if(id==1 && id!=null)
    employeesList.splice(0,1);
  }
}

describe('GetAllEnployeesComponent', () => {
  let component: GetAllEmployeeComponent;
  let fixture: ComponentFixture<GetAllEmployeeComponent>;
  let dataAccessService: EmployeeServiceService;
  let employee: Employees[];
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async (() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule,NgxPaginationModule,BrowserModule],
      declarations: [ GetAllEmployeeComponent ],
      providers: [
        EmployeeServiceService,
        {
          provide: EmployeeServiceService,
          useClass: EmployeeServiceMock
        },
        { provide: GetAllEmployeeComponent, useClass: EmployeeServiceMock }],
    })
    .compileComponents().then(() => {
      fixture = TestBed.createComponent(GetAllEmployeeComponent);
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

 it(`should have one user`,  async(() => {
    let response;
    spyOn(dataAccessService, 'getAllEmployee').and.returnValue(of(employee));
    dataAccessService.getAllEmployee().subscribe(res => {
      response = res;
    });
    expect(response).toEqual(employee);
    }));

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it(`html should render one user`, async(() => {
      
      component.employees = employee;
        fixture.detectChanges();
        const el = fixture.nativeElement.querySelector('table');
        expect(el.innerText).toContain('Jay');
        
        expect(el.innerText).toContain('abc');
    }));

    it(`should call the onSubmit method`, async(() => {
      component.employees = employee;
      fixture.detectChanges();
      spyOn(component, 'deletePlayer').withArgs(1);
      el = fixture.debugElement.query(By.css('button')).nativeElement;
      el.click();
      expect(component.deletePlayer).toHaveBeenCalledTimes(1);//.toHaveBeenCalledWith(component.createForm);
    }));
  
  
    it('deleting a form', () => {
      component.employees = employee;
        fixture.detectChanges();
        spyOn(component, 'deletePlayer').withArgs(1);
      // Subscribe to the Observable and store the user in a local variable.

      spyOn(dataAccessService, 'deleteEmployeeById').withArgs(1);
  
      dataAccessService.deleteEmployeeById(1);
    
      // Trigger the onSubmit function
     component.deletePlayer(1);
     // Should set submitted to true
  
     el = fixture.debugElement.query(By.css('button')).nativeElement;
     el.click();
     expect(component.deletePlayer).toHaveBeenCalledTimes(2);
     expect(component.deletePlayer).toHaveBeenCalledWith(1);
     component.employees = employeesList;
      // Now we can check to make sure the emitted value is correct


      fixture.detectChanges();
      el = fixture.nativeElement.querySelector('table');
      expect(el.innerText).toContain('Jay');
      expect(el.innerText).toContain('abc');
    });

  });