import { Injectable, Inject } from '@angular/core';  
import { HttpClient, HttpHeaders  } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Employees } from '../Models/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {
  readonly baseURL : string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) {
    this.baseURL = 'https://localhost:44306/Employee/';
  }

  getAllEmployee(): Observable<Employees[]> {
    return this.httpClient.get<Employees[]>(this.baseURL)
      .pipe(
        catchError(this.errorHandler)
      );
  }
 
  getEmployeeById(id): Observable<Employees> {
    return this.httpClient.get<Employees>(this.baseURL + id)
      .pipe(
        catchError(this.errorHandler)
      );
  }
 
  createEmployee(employee): Observable<Employees> {
    return this.httpClient.post<Employees>(this.baseURL, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
 
  updateEmployeeById(id, employee): Observable<Employees> {
    return this.httpClient.put<Employees>(this.baseURL + id, JSON.stringify(employee), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
 
  deleteEmployeeById(id) {
    return this.httpClient.delete<Employees>(this.baseURL + id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }
 
  errorHandler(error) {
    let errorMessage = '';
 
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
  
}
