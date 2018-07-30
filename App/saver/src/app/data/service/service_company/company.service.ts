import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {MessageService} from "../message/service_message/message.service";
import {Company} from "../../../models/Company";





const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CompanyService {

  private companyUrl = 'http://127.0.0.1:8124/api/companies';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get companies from the server
   * @author Thijs Zijdel
   */
  getCompanies(): Observable<Company[]> {
    const url = `${this.companyUrl}`;
    return this.http.get<Company[]>(this.companyUrl)
      .pipe(
        tap(companies => this.log(`fetched companies`)),
        catchError(this.handleError('getCompany', []))
      );
  }

  /**
   * get company by id.
   * @author Thijs Zijdel
   */
  getCompany(id: number): Observable<Company> {
    const url = `${this.companyUrl}/get/${id}`;

    return this.http.get<Company>(url).pipe(
      tap(_ => this.log(`fetched company id=${id}`)),
      catchError(this.handleError<Company>(`getCompany id=${id}`))
    );
  }


  /**
   * Log a companieservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('CompanyService: ' + message);
  }


  /**
   * Handle Http operation that failed.
   *
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   * @author Thijs Zijdel
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      console.error(error); // log to console

      this.log(`${operation} failed: ${error.message}`);

      // Prevent crashing the application
      return of(result as T);
    };
  }


  /**
   * update the company on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateCompany (company: Company): Observable<any> {
    const url = `${this.companyUrl}`;

    return this.http.put(url, company, httpOptions).pipe(
      tap(_ => this.log(`updated company id=${company.id}`)),
      catchError(this.handleError<any>('updateCompany'))
    );
  }

  /**
   * add a new company to the server
   * note: POST
   */
  addCompany (company: Company): Observable<Company> {
    const url = `${this.companyUrl}`;

    return this.http.post<Company>(url, company, httpOptions).pipe(
      tap((company: Company) => this.log(`added company w/ id=${company.id}`)),
      catchError(this.handleError<Company>('addCompany'))
    );
  }

  /**
   * delete the company from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteCompany (company: Company | number): Observable<Company> {
    const id = typeof company === 'number' ? company : company.id;
    const url = `${this.companyUrl}/delete/:id`;

    return this.http.delete<Company>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted incom id=${id}`)),
      catchError(this.handleError<Company>('deleteCompany'))
    );
  }



  /**
   * get company types from the server
   * @author Thijs Zijdel

   getCompanyTypes(): Observable<CompanyType[]> {
    const url = `${this.companyUrl}/types`;
    console.log(" beeing called -->"+`${this.companyUrl}/types`)
    return this.http.get<CompanyType[]>(this.companyUrl)
      .pipe(
        tap(companies => this.log(`fetched company types`)),
        catchError(this.handleError('getCompany cats', []))
      );
  }
   */
}

