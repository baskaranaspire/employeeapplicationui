import { Location } from "@angular/common";
import { TestBed, fakeAsync, tick } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { GetAllEmployeeComponent } from './get-all-employee/get-all-employee.component';
import { GetEmployeeByIdComponent } from './get-employee-by-id/get-employee-by-id.component';
import { PageNotFoundComponent } from './Http Error Pages/PageNotFoundComponent';
import { UpdateEmployeeByIdComponent } from './update-employee-by-id/update-employee-by-id.component';
import { routes } from "./app-routing.module";

describe("Router: App", () => {
  let location: Location;
  let router: Router;
  let fixture;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [CreateEmployeeComponent, GetAllEmployeeComponent, GetEmployeeByIdComponent, PageNotFoundComponent, UpdateEmployeeByIdComponent]
    });

    router = TestBed.get(Router);
    location = TestBed.get(Location);

    fixture = TestBed.createComponent(AppComponent);
    router.initialNavigation();
  });

  it("fakeAsync works", fakeAsync(() => {
    let promise = new Promise(resolve => {
      setTimeout(resolve, 10);
    });
    let done = false;
    promise.then(() => (done = true));
    tick(50);
    expect(done).toBeTruthy();
  }));

  it('navigate to "" redirects you to /list', fakeAsync(() => {
    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/Employee/list");
    });
  }));

  it('navigate to "search" takes you to /create', fakeAsync(() => {
    router.navigate(["Employee/create"]).then(() => {
      expect(location.path()).toBe("/Employee/create");
    });
}));
    it('navigate to not exists', fakeAsync(() => {
        router.navigate(["**"]).then(() => {
          expect(location.path()).toBe("/**");
        });
  }));
});