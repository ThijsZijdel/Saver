import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Spending} from "../../../models/Spending";
import {MessageService} from "../../../data/service/message/service_message/message.service";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class SpendingService {

  private spendingUrl = 'http://127.0.0.1:8124/api/spendings';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }



  /**
   * get spending by id.
   * @author Thijs Zijdel
   */
  getSpending(month: number, year:number): Observable<Spending[]> {
    const url = `${this.spendingUrl}/get/${month}/${year}`;

    return this.http.get<Spending[]>(url).pipe(
      tap(_ => this.log(`fetched Spendings month=${month} year=${year}`)),
      catchError(this.handleError<Spending[]>(`getSpendings month=${month} year=${year}`))
    );
  }

  /**
   * get spending by id.
   * @author Thijs Zijdel
   */
  getSpendings(months: number): Observable<Spending[]> {
    const url = `${this.spendingUrl}/?months=`+months;

    return this.http.get<Spending[]>(url).pipe(
      tap(_ => this.log(`fetched Spendings  months=${months} `)),
      catchError(this.handleError<Spending[]>(`getSpendings months=${months}`))
    );
  }



  /**
   * Log a spendingservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('SpendingService: ' + message);
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
   * update the spending on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateSpending (spending: Spending): Observable<any> {
    const url = `${this.spendingUrl}?action=edit`;

    return this.http.put(url, spending, httpOptions).pipe(
      tap(_ => this.log(`updated spending id=${spending.id}`)),
      catchError(this.handleError<any>('updateSpending'))
    );
  }

  /**
   * add a new spending to the server
   * note: POST
   */
  addSpending (spending: Spending): Observable<Spending> {
    const url = `${this.spendingUrl}?action=add`;

    return this.http.post<Spending>(url, spending, httpOptions).pipe(
      tap((spending: Spending) => this.log(`added spending w/ id=${spending.id}`)),
      catchError(this.handleError<Spending>('addSpending'))
    );
  }

  /**
   * delete the spending from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteSpending (spending: Spending | number): Observable<Spending> {
    const id = typeof spending === 'number' ? spending : spending.id;
    const url = `${this.spendingUrl}?action=delete&id=${id}`;

    return this.http.delete<Spending>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted incom id=${id}`)),
      catchError(this.handleError<Spending>('deleteSpending'))
    );
  }

  /**
   * get spendings whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchSpendings(term: string): Observable<Spending[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Spending[]>(`api/spendings/?name=${term}`).pipe(
      tap(_ => this.log(`found spendings matching "${term}"`)),
      catchError(this.handleError<Spending[]>('searchSpendings', []))
    );
  }

}

