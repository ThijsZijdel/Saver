import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Budget} from "../../../models/Budget";
import {MessageService} from "../../../data/service_message/message.service";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class BudgetService {

  private budgetUrl = 'api/budgets';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get budgets from the server
   * @author Thijs Zijdel
   */
  getBudgets(): Observable<Budget[]> {
    const url = `${this.budgetUrl}?action=getAll`;
    return this.http.get<Budget[]>(this.budgetUrl)
      .pipe(
        tap(budgets => this.log(`fetched budgets`)),
        catchError(this.handleError('getBudget', []))
      );
  }

  /**
   * get budget by id.
   * @author Thijs Zijdel
   */
  getBudget(id: number): Observable<Budget> {
    const url = `${this.budgetUrl}?action=get&id=${id}`;

    return this.http.get<Budget>(url).pipe(
      tap(_ => this.log(`fetched budget id=${id}`)),
      catchError(this.handleError<Budget>(`getBudget id=${id}`))
    );
  }

  getBudgetsOf(month: number, year: number): Observable<Budget[]> {
    const url = `${this.budgetUrl}?action=getBudgets&month=${month}&year=${year}`;

    return this.http.get<Budget[]>(url).pipe(
      tap(_ => this.log(`fetched Budgets month=${month} year=${year}`)),
      catchError(this.handleError<Budget[]>(`getBudgets month=${month} year=${year}`))
    );
  }

  /**
   * Log a budgetservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('BudgetService: ' + message);
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
   * update the budget on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateBudget (budget: Budget): Observable<any> {
    const url = `${this.budgetUrl}?action=edit`;

    return this.http.put(url, budget, httpOptions).pipe(
      tap(_ => this.log(`updated budget id=${budget.id}`)),
      catchError(this.handleError<any>('updateBudget'))
    );
  }

  /**
   * add a new budget to the server
   * note: POST
   */
  addBudget (budget: Budget): Observable<Budget> {
    const url = `${this.budgetUrl}?action=add`;

    return this.http.post<Budget>(url, budget, httpOptions).pipe(
      tap((budget: Budget) => this.log(`added budget w/ id=${budget.id}`)),
      catchError(this.handleError<Budget>('addBudget'))
    );
  }

  /**
   * delete the budget from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteBudget (budget: Budget | number): Observable<Budget> {
    const id = typeof budget === 'number' ? budget : budget.id;
    const url = `${this.budgetUrl}?action=delete&id=${id}`;

    return this.http.delete<Budget>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted incom id=${id}`)),
      catchError(this.handleError<Budget>('deleteBudget'))
    );
  }

  /**
   * get budgets whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchBudgets(term: string): Observable<Budget[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Budget[]>(`api/budgets/?name=${term}`).pipe(
      tap(_ => this.log(`found budgets matching "${term}"`)),
      catchError(this.handleError<Budget[]>('searchBudgets', []))
    );
  }

}

