
import { TestBed, inject, async } from "@angular/core/testing";
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpResponse  } from '@angular/common/http';
import { MockBackend } from "@angular/http/testing"
import {
  HttpClientTestingModule,
  HttpTestingController
} from "@angular/common/http/testing";

//import { DataAccessService, CalculationsService } from "./data-access.service";
//import { Traveller } from "./traveller";
import { Employees } from '../Models/Employee';
import { EmployeeServiceService } from '../Services/employee-service.service';

describe("DataAccessService", () => {
  let httpTestingController: HttpTestingController;
  let dataAccessService: EmployeeServiceService;
  let baseUrl = "https://localhost:44306/Employee/";
  let employee: Employees[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });

    httpTestingController = TestBed.get(HttpTestingController);
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
  });

  beforeEach(inject([EmployeeServiceService], (service: EmployeeServiceService) => {
    dataAccessService = service;
  }));

  /*it("should be created", () => {
    expect(dataAccessService).toBeTruthy();
  });*/

  it("should return data", () => {
    let result: Employees[];
    dataAccessService.getAllEmployee().subscribe(t => {
      result = t;
    });
    const req = httpTestingController.expectOne({
      method: "GET",
      url: baseUrl
    });

    req.flush(employee);
    expect(result).toHaveSize(2);
    expect(result[0]).toEqual(employee[0]);
  });

  it('should return a single employee SUCCESS', () => {
    /*let response;
    spyOn(dataAccessService, 'getEmployeeById').withArgs(1).and.returnValue(of(employee[0]));

    dataAccessService.getEmployeeById(1).subscribe(res => {
      response = res;
    });

    expect(response).toEqual(employee[0]);*/
    let result: Employees;
    dataAccessService.getEmployeeById(1).subscribe(t => {
      result = t;
    });
    let id = 1;
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${baseUrl}${id}`
    });

    req.flush(employee[0]);
    expect(result).toEqual(employee[0]);
  });

  it('should return a single employee ID not exists', () => {
    let result;
    dataAccessService.getEmployeeById(3).subscribe(t => {
      result = t;
    });
    let id = 3;
    const req = httpTestingController.expectOne({
      method: "GET",
      url: `${baseUrl}${id}`
    });

    req.flush(null);
    expect(result).toBe(null);
  });
  
  it("should call delete employee API", () => {
    dataAccessService.deleteEmployeeById(1).subscribe();
    let id = 1;
    let req = httpTestingController.expectOne({
      method: "DELETE",
      url: `${baseUrl}${id}`
    });

    expect(req).toBeDefined();
  });

  it("should call delete employee API with ID not exists", () => {
    dataAccessService.deleteEmployeeById(3).subscribe();
    let id = 3;
    let req = httpTestingController.expectOne({
      method: "DELETE",
      url: `${baseUrl}${id}`
    });

    expect(req).toBeDefined();

  });

  it("should call POST API to create a new employee", async((done) => {
    dataAccessService.createEmployee(employee[0]).subscribe();

    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}` });
    req.flush(employee[0]);
    expect(req.request.body).toEqual(JSON.stringify(employee[0]));
  }));

  it("should call POST API to pass null", async((done) => {
    dataAccessService.createEmployee(null).subscribe();

    let req = httpTestingController.expectOne({ method: "POST", url: `${baseUrl}` });
    expect(req.request.body).toBe('null');
  }));

  it("should call put API to update a employee", () => {
    dataAccessService.updateEmployeeById(1,employee[0]).subscribe();
    
    let req = httpTestingController.expectOne({
      method: "PUT",
      url: `${baseUrl}${1}`
    });
    req.flush(employee[0]);
    expect(req.request.body).toEqual(JSON.stringify(employee[0]));
  });

  it("should call put API to not update a employee passing null object", () => {
    dataAccessService.updateEmployeeById(1,null).subscribe();
    
    let req = httpTestingController.expectOne({
      method: "PUT",
      url: `${baseUrl}${1}`
    });
    expect(req.request.body).toBe('null');
  });

  afterEach(() => {
    httpTestingController.verify();
  });
});
