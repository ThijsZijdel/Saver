import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Balance} from "../../../models/Balance";
import {MessageService} from "../../../message/service_message/message.service";

import {BalanceType} from "../../../models/BalanceType";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BalanceService {

  private balanceUrl = 'http://127.0.0.1:8124/api/balances';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get balances from the server
   * @author Thijs Zijdel
   */
  getBalances(): Observable<Balance[]> {
    const url = `${this.balanceUrl}`;
    return this.http.get<Balance[]>(this.balanceUrl)
      .pipe(
        tap(balances => this.log(`fetched balances`)),
        catchError(this.handleError('getBalance', []))
      );
  }

  /**
   * get balance by id.
   * @author Thijs Zijdel
   */
  getBalance(id: number): Observable<Balance> {
    const url = `${this.balanceUrl}/get/${id}`;

    return this.http.get<Balance>(url).pipe(
      tap(_ => this.log(`fetched balance id=${id}`)),
      catchError(this.handleError<Balance>(`getBalance id=${id}`))
    );
  }

  getBalancesOf(month: number, year: number): Observable<Balance[]> {
    const url = `${this.balanceUrl}?action=getBalances&month=${month}&year=${year}`;

    return this.http.get<Balance[]>(url).pipe(
      tap(_ => this.log(`fetched Balances month=${month} year=${year}`)),
      catchError(this.handleError<Balance[]>(`getBalances month=${month} year=${year}`))
    );
  }

  /**
   * Log a balanceservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('BalanceService: ' + message);
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
   * update the balance on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateBalance (balance: Balance): Observable<any> {
    const url = `${this.balanceUrl}?action=edit`;

    return this.http.put(url, balance, httpOptions).pipe(
      tap(_ => this.log(`updated balance id=${balance.id}`)),
      catchError(this.handleError<any>('updateBalance'))
    );
  }

  /**
   * add a new balance to the server
   * note: POST
   */
  addBalance (balance: Balance): Observable<Balance> {
    const url = `${this.balanceUrl}?action=add`;

    return this.http.post<Balance>(url, balance, httpOptions).pipe(
      tap((balance: Balance) => this.log(`added balance w/ id=${balance.id}`)),
      catchError(this.handleError<Balance>('addBalance'))
    );
  }

  /**
   * delete the balance from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteBalance (balance: Balance | number): Observable<Balance> {
    const id = typeof balance === 'number' ? balance : balance.id;
    const url = `${this.balanceUrl}?action=delete&id=${id}`;

    return this.http.delete<Balance>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted incom id=${id}`)),
      catchError(this.handleError<Balance>('deleteBalance'))
    );
  }

  /**
   * get balances whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchBalances(term: string): Observable<Balance[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Balance[]>(`api/balances/?name=${term}`).pipe(
      tap(_ => this.log(`found balances matching "${term}"`)),
      catchError(this.handleError<Balance[]>('searchBalances', []))
    );
  }

  /**
   * get balance types from the server
   * @author Thijs Zijdel

  getBalanceTypes(): Observable<BalanceType[]> {
    const url = `${this.balanceUrl}/types`;
    console.log(" beeing called -->"+`${this.balanceUrl}/types`)
    return this.http.get<BalanceType[]>(this.balanceUrl)
      .pipe(
        tap(balances => this.log(`fetched balance types`)),
        catchError(this.handleError('getBalance cats', []))
      );
  }
   */
}

