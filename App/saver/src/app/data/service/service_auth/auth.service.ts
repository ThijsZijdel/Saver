import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import {Observable, of} from 'rxjs/index';
import {User} from "../../../models/User";
import {MessageService} from "../../service_message/message.service";




const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  //http://127.0.0.1:8124
  private userUrl = '/auth/users';  // URL to web api

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /**
   * get users from the server
   * @author Thijs Zijdel
   */
  getUsers(): Observable<User[]> {
    const url = `${this.userUrl}`; //?action=getAll
    return this.http.get<User[]>(url)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUser', []))
      );
  }

  /**
   * get user by id.
   * @author Thijs Zijdel
   */
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}?action=get&id=${id}`;

    return this.http.get<User>(url).pipe(
      tap(_ => this.log(`fetched user id=${id}`)),
      catchError(this.handleError<User>(`getUser id=${id}`))
    );
  }

  getUsersOf(month: number, year: number): Observable<User[]> {
    const url = `${this.userUrl}?action=getUsers&month=${month}&year=${year}`;

    return this.http.get<User[]>(url).pipe(
      tap(_ => this.log(`fetched Users month=${month} year=${year}`)),
      catchError(this.handleError<User[]>(`getUsers month=${month} year=${year}`))
    );
  }

  /**
   * Log a userservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('UserService: ' + message);
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
   * update the user on the server
   * note: PUT
   * @author Thijs Zijdel
   */
  updateUser (user: User): Observable<any> {
    const url = `${this.userUrl}?action=edit`;

    return this.http.put(url, user, httpOptions).pipe(
      tap(_ => this.log(`updated user id=${user.id}`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }

  /**
   * add a new user to the server
   * note: POST
   */
  addUser (user: User): Observable<User> {
    const url = `${this.userUrl}?action=add`;

    return this.http.post<User>(url, user, httpOptions).pipe(
      tap((user: User) => this.log(`added user w/ id=${user.id}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  /**
   * delete the user from the server
   * note: DELETE
   * @author Thijs Zijdel
   */
  deleteUser (user: User | number): Observable<User> {
    const id = typeof user === 'number' ? user : user.id;
    const url = `${this.userUrl}?action=delete&id=${id}`;

    return this.http.delete<User>(url, httpOptions).pipe(
      tap(_ => this.log(`deleted user id=${id}`)),
      catchError(this.handleError<User>('deleteUser'))
    );
  }

  /**
   * get users whose name contains search term
   * note: GET
   * @author Thijs Zijdel
   */
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<User[]>(`api/users/?name=${term}`).pipe(
      tap(_ => this.log(`found users matching "${term}"`)),
      catchError(this.handleError<User[]>('searchUsers', []))
    );
  }

}

