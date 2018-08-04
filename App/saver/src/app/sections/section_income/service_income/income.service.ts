import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Income} from "../../../models/Income";
import {MessageService} from "../../../data/service/message/service_message/message.service";
import {Expense} from "../../../models/Expense";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class IncomeService {

  private incomeUrl = 'http://127.0.0.1:8124/api/incomes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get incomes from the server
   * @author Thijs Zijdel
   */
  getIncomes(): Observable<Income[]> {
    const url = `${this.incomeUrl}`; //?action=getAll;
    return this.http.get<Income[]>(this.incomeUrl)
      .pipe(
        tap(incomes => this.log(`fetched incomes`)),
        catchError(this.handleError('getIncome', []))
      );
  }

  /**
   * get income by id.
   * @author Thijs Zijdel
   */
  getIncome(id: number): Observable<Income> {
    const url = `${this.incomeUrl}/get/${id}`;

    return this.http.get<Income>(url).pipe(
      tap(_ => this.log(`fetched income id=${id}`)),
      catchError(this.handleError<Income>(`getIncome id=${id}`))
    );
  }

  getIncomesOf(month: number, year: number): Observable<Income[]> {
    const url = `${this.incomeUrl}?action=getIncomes&month=${month}&year=${year}`;

    return this.http.get<Income[]>(url).pipe(
      tap(_ => this.log(`fetched Incomes month=${month} year=${year}`)),
      catchError(this.handleError<Income[]>(`getIncomes month=${month} year=${year}`))
    );
  }

  /**
   * Log a incomeService message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('IncomeService: ' + message);
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
   * update the income on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateIncome (income: Income): Observable<any> {
    const url = `${this.incomeUrl}?action=edit`;

    return this.http.put(url, income, httpOptions).pipe(
      tap(_ => this.log(`updated income id=${income.id}`)),
      catchError(this.handleError<any>('updateIncome'))
    );
  }

  /**
   * add a new income to the server
   * note: POST
   */
  addIncome (income: Income): Observable<Income> {
    const url = `${this.incomeUrl}`;

    return this.http.post<Income>(url, income, httpOptions).pipe(
      tap((income: Income) => this.log(`added income w/ id=${income.id}`)),
      catchError(this.handleError<Income>('addIncome'))
    );
  }

  /**
   * delete the income from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteIncome (income: Income | number): Observable<Income> {
    const id = typeof income === 'number' ? income : income.id;
    const url = `${this.incomeUrl}?action=delete&id=${id}`;

    return this.http.delete<Income>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted incom id=${id}`)),
      catchError(this.handleError<Income>('deleteIncome'))
    );
  }

  /**
   * get incomes whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchIncomes(term: string): Observable<Income[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Income[]>(`api/incomes/?name=${term}`).pipe(
      tap(_ => this.log(`found incomes matching "${term}"`)),
      catchError(this.handleError<Income[]>('searchIncomes', []))
    );
  }

  getIncomesFiltered(frequency: string, months: number): Observable<Income[]> {
    const url = `${this.incomeUrl}/`+frequency+`/`+months; // ?action=getAll;
    return this.http.get<Income[]>(url)
      .pipe(
        tap(expenses => this.log(`fetched `+frequency+` - `+months+`months: incomes`)),
        catchError(this.handleError('getIncomes with frequency of '+frequency+' - '+months, []))
      );
  }
}

