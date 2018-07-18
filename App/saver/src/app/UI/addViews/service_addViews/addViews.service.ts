import { Injectable } from '@angular/core';
import {Expense} from "../../../models/Expense";
import {MessageService} from "../../../data/service_message/message.service";



@Injectable()
export class AddViewsService {

  showAddViewOverlay: boolean = false;

  editObj: boolean = false;
  addObj: boolean = false;

  private expense: Expense = null;

  constructor(private messageService: MessageService){}

  clear() {
    this.log("Cleared");

    this.editObj = false;
    this.addObj = false;

    this.expense = null;
  }

  show(){
    this.showAddViewOverlay = true;
  }

  getExpense(): Expense{
    this.log("Expense returned");
    return this.expense;
  }

  setExpense(expens: Expense) {
    this.log("Expense set");

    this.expense = expens;

    this.show();
  }




  /**
   * Log a expenseservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('Manage Overlay View: ' + message);
  }
}
