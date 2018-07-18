import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';

import {MessageService} from "../../../message/service_message/message.service";


import {BalanceType} from "../../../models/BalanceType";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BalanceTypeService {

  private balanceUrl = 'http://127.0.0.1:8124/api/balanceTypes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }


  /**
   * Log a balanceservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('BalanceTypeService: ' + message);
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
   * get balance types from the server
   * @author Thijs Zijdel
   */
  getBalanceTypes(): Observable<BalanceType[]> {
    const url = `${this.balanceUrl}`;

    return this.http.get<BalanceType[]>(this.balanceUrl)
      .pipe(
        tap(balances => this.log(`fetched balance types`)),
        catchError(this.handleError('getBalance cats', []))
      );
  }
}

