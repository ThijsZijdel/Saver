import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Income} from "../../../models/Income";
import {MessageService} from "../../../data/service_message/message.service";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class IncomeService {

  private incomeUrl = 'api/incomes';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get tasks from the server
   * @author Thijs Zijdel
   */
  getIncomes(): Observable<Income[]> {
    const url = `${this.incomeUrl}?action=getAll`;
    return this.http.get<Income[]>(url)
      .pipe(
        tap(tasks => this.log(`fetched income`)),
        catchError(this.handleError('getIncome', []))
      );
  }

  /**
   * get task by id.
   * @author Thijs Zijdel
   */
  getIncome(id: number): Observable<Income> {
    const url = `${this.incomeUrl}?action=get&id=${id}`;

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
   * Log a TaskService message with the MessageService
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
   * update the task on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateTask (task: Income): Observable<any> {
    const url = `${this.incomeUrl}?action=edit`;

    return this.http.put(url, task, httpOptions).pipe(
      tap(_ => this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('updateTask'))
    );
  }

  /**
   * add a new task to the server
   * note: POST
   */
  addTask (task: Income): Observable<Income> {
    const url = `${this.incomeUrl}?action=add`;

    return this.http.post<Income>(url, task, httpOptions).pipe(
      tap((income: Income) => this.log(`added task w/ id=${income.id}`)),
      catchError(this.handleError<Income>('addTask'))
    );
  }

  /**
   * delete the task from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteTask (task: Income | number): Observable<Income> {
    const id = typeof task === 'number' ? task : task.id;
    const url = `${this.incomeUrl}?action=delete&id=${id}`;

    return this.http.delete<Income>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Income>('deleteTask'))
    );
  }

  /**
   * get tasks whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchTasks(term: string): Observable<Income[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Income[]>(`api/tasks/?name=${term}`).pipe(
      tap(_ => this.log(`found tasks matching "${term}"`)),
      catchError(this.handleError<Income[]>('searchTasks', []))
    );
  }

}

