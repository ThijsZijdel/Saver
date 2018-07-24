import { Injectable } from '@angular/core';
import {Expense} from "../../../../models/Expense";
import {MessageService} from "../../../service/message/service_message/message.service";
import {Category} from "../../../../models/Category";



@Injectable()
export class AddViewsService {

  showAddViewOverlay: boolean = false;

  editObj: boolean = false;
  addObj: boolean = false;

  private expense: Expense = null;
  private category: Category = null;

  constructor(private messageService: MessageService){}

  clear() {
    this.log("Cleared all");

    this.editObj = false;
    this.addObj = false;

    this.expense = null;
    this.category = null;

    this.showAddViewOverlay = false
  }

  show(){
    this.showAddViewOverlay = true;
  }

  getExpense(): Expense{
    return this.expense;
  }

  setExpense(expense: Expense) {
    this.expense = expense;
    this.show();
  }

  getCategory(): Category{
    return this.category;
  }

  setCategory(category: Category) {
    this.category = category;
    this.show();
  }




  /**
   * Log a expenseservice message with the MessageService
   * @author Thijs Zijdel
   */
  private log(message: string) {
    this.messageService.add('Manage Overlay View: ' + message);
  }

  isEdit(bool: boolean) {
    this.editObj = bool;
    this.addObj = !bool;
  }
}
