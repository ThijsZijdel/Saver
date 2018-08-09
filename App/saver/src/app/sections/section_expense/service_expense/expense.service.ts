import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Expense} from "../../../models/Expense";
import {MessageService} from "../../../data/service/message/service_message/message.service";
import {Category} from "../../../models/Category";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class ExpenseService {

  private expensUrl = 'http://127.0.0.1:8124/api/expenses';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get expenses from the server
   * @author Thijs Zijdel
   */
  getExpenses(): Observable<Expense[]> {
    const url = `${this.expensUrl}`; // ?action=getAll;
    return this.http.get<Expense[]>(url)
      .pipe(
        tap(expenses => this.log(`fetched expenses`)),
        catchError(this.handleError('getExpense', []))
      );
  }

  /**
   * get expenses from the server
   * @author Thijs Zijdel
   */
  getExpensesFiltered(frequency: string, months: number): Observable<Expense[]> {
    const url = `${this.expensUrl}/${frequency}/${months}` // ?action=getAll;
    return this.http.get<Expense[]>(url)
      .pipe(
        tap(expenses => this.log(`fetched `+frequency+` - `+months+`months: expenses`)),
        catchError(this.handleError('getExpenses with frequency of '+frequency+' - '+months, []))
      );
  }

  /**
   * get expense by id.
   * @author Thijs Zijdel
   */
  getExpense(id: number): Observable<Expense> {
    const url = `${this.expensUrl}/get/${id}`;

    return this.http.get<Expense>(url).pipe(
      tap(_ => this.log(`fetched expense id=${id}`)),
      catchError(this.handleError<Expense>(`getExpense id=${id}`))
    );
  }

  /**
   * get expenses of certain month
   * @param {number} month
   * @param {number} year
   * @param groupBy
   * @returns {Observable<Expense[]>}
   */
  getExpensesOf(month: number, year: number, orderBy?: string): Observable<Expense[]> {
    let url = `${this.expensUrl}/get/${month}/${year}`;

    if (orderBy != null) {
      url +="?orderBy="+orderBy;
    }

    return this.http.get<Expense[]>(url).pipe(
      tap(_ => this.log(`fetched Expenses month=${month} year=${year}`)),
      catchError(this.handleError<Expense[]>(`getExpenses month=${month} year=${year}`))
    );
  }


  /**
   * Log a expenseservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('ExpenseService: ' + message);
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
   * update the expense on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateExpense (expense: Expense): Observable<any> {
    const url = `${this.expensUrl}?action=edit`;

    return this.http.put(url, expense, httpOptions).pipe(
      tap(_ => this.log(`updated expense id=${expense.id}`)),
      catchError(this.handleError<any>('updateExpense'))
    );
  }

  /**
   * add a new expense to the server
   * note: POST
   */
  addExpense (expense: Expense): Observable<Expense> {
    const url = `${this.expensUrl}`;
    expense.sqlDate = expense.date.toJSON().slice(0, 10);

    expense.alreadyPaid === true ?  expense.alreadyPaid = 0 :expense.alreadyPaid = 1 ;

    return this.http.post<Expense>(url, expense, httpOptions).pipe(
      tap((expense: Expense) => this.log(`added expense w/ id=${expense.id}`)),
      catchError(this.handleError<Expense>('addExpense'))
    );
  }

  /**
   * delete the expense from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteExpense (expense: Expense | number): Observable<Expense> {
    const id = typeof expense === 'number' ? expense : expense.id;
    const url = `${this.expensUrl}?action=delete&id=${id}`;

    return this.http.delete<Expense>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted incom id=${id}`)),
      catchError(this.handleError<Expense>('deleteExpense'))
    );
  }

  /**
   * get expenses whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchExpenses(term: string): Observable<Expense[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Expense[]>(`api/expenses/?name=${term}`).pipe(
      tap(_ => this.log(`found expenses matching "${term}"`)),
      catchError(this.handleError<Expense[]>('searchExpenses', []))
    );
  }

  public getExpensesOfcategory(cat: Category, expenses: Expense[]): Expense[] {
    let data: Expense[] = [];

    for (let expense of expenses) {
      if(expense.subcategoryFk == cat.id && expense.subcategoryFk != 0){
        data.push(expense);
      }
    }
    return data;
  }

  public getExpensesOfmainCategory(cat: Category, expenses: Expense[]): Expense[] {
    let data: Expense[] = [];

    for (let expense of expenses) {
      if (expense.subcategoryFk === cat.id  ||
        expense.subcategoryFk === cat.subCategoryFk) {
        data.push(expense);
      }



    }
    return data;
  }


  public getSumAmount(expenses: Expense[]): number {
    let sum: number = 0;

    for (let expense of expenses){
      sum += expense.amount;
    }

    return sum;
  }

  getLastExpenseOfCategory(categoryId: Number, expenses: Expense[]) {
    let data: Expense[] = [];
    for (let expense of expenses) {
      if(expense.subcategoryFk == categoryId){
        data.push(expense);
      }

      if (data.length > 0){
        return data;
      }
    }
    return data;
  }





}

