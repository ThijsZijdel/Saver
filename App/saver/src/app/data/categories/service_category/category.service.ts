import { Injectable } from '@angular/core';
import {catchError, retry, tap} from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {Category} from "../../../models/Category";
import {MessageService} from "../../service/message/service_message/message.service";
import {Expense} from "../../../models/Expense";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class CategoryService {

  private categoryUrl = 'http://127.0.0.1:8124/api/categories';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get categories from the server
   * @author Thijs Zijdel
   */
  getCategories(): Observable<Category[]> {
    const url = `${this.categoryUrl}`; //?action=getAll
    return this.http.get<Category[]>(url)
      .pipe(
        tap(categories => this.log(`fetched categories`)),
        catchError(this.handleError('getCategory', []))
      );
  }

  /**
   * get categories from the server
   * @author Thijs Zijdel
   */
  getMainCategories(): Observable<Category[]> {
    const url = `${this.categoryUrl}/main`; //?action=getAll
    return this.http.get<Category[]>(url)
      .pipe(
        tap(categories => this.log(`fetched main categories`)),
        catchError(this.handleError('getCategory', []))
      );
  }




  /**
   * get category by id.
   * @author Thijs Zijdel
   */
  getCategory(id: number): Observable<Category> {
    const url = `${this.categoryUrl}/get/${id}`;

    return this.http.get<Category>(url).pipe(
      tap(_ => this.log(`fetched category id=${id}`)),
      catchError(this.handleError<Category>(`getCategory id=${id}`))
    );
  }

  getCategoriesOf(month: number, year: number): Observable<Category[]> {
    const url = `${this.categoryUrl}?action=getCategories&month=${month}&year=${year}`;

    return this.http.get<Category[]>(url).pipe(
      tap(_ => this.log(`fetched Categories month=${month} year=${year}`)),
      catchError(this.handleError<Category[]>(`getCategories month=${month} year=${year}`))
    );
  }

  /**
   * Log a categorieservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('CategoryService: ' + message);
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
   * update the category on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateCategory (category: Category): Observable<any> {
    const url = `${this.categoryUrl}/edit`;

    return this.http.put(url, category, httpOptions).pipe(
      tap(_ => this.log(`updated category id=${category.id}`)),
      catchError(this.handleError<any>('updateCategory'))
    );
  }

  /**
   * add a new category to the server
   * note: POST
   */
  addCategory (category: Category): Observable<Category> {
    const url = `${this.categoryUrl}`;

    return this.http.post<Category>(url, category).pipe(
      tap((category: Category) => this.log(`added category w/ name=${category.name}`)),
      catchError(this.handleError<Category>('addCategory'))
    );
  }

  /**
   * delete the category from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteCategory (category: Category | number) {
    const id = typeof category === 'number' ? category : category.id;
    const url = `${this.categoryUrl}/delete/${id}`;

    console.log( url)
    return this.http.delete(url).pipe(
      tap(_ => this.log(`deleted category id=${id}`)),
      retry(2),
      catchError(this.handleError<Category>('deleteCategory'))
    ).subscribe(() => console.log("Successful deleted category "+id));
  }

  // return this.http.get<Category>(url).pipe(
  //   tap(_ => this.log(`fetched category id=${id}`)),
  // catchError(this.handleError<Category>(`getCategory id=${id}`))
  // );



  /**
   * get categories whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchCategories(term: string): Observable<Category[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Category[]>(`api/categories/?name=${term}`).pipe(
      tap(_ => this.log(`found categories matching "${term}"`)),
      catchError(this.handleError<Category[]>('searchCategories', []))
    );
  }

  getExpenseCategories(month: number, year: number, filter: string): Observable<Category[]> {
    let url = `${this.categoryUrl}/get/${month}/${year}/${filter}`;



    return this.http.get<Category[]>(url).pipe(
      tap(_ => this.log(`fetched Category month=${month} year=${year}`)),
      catchError(this.handleError<Category[]>(`getCategory month=${month} year=${year}`))
    );
  }
}

