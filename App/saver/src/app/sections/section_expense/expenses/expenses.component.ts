import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {CategoryService} from "../../../data/service/service_category/category.service";
import {Category} from "../../../models/Category";
import * as $ from "jquery"

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(private serviceExpenses: ExpenseService,
              private serviceCategories: CategoryService) { }

  expenses: Expense[] = [];
  categories: Category[] = [];

  ngOnInit() {
    this.categories = this.getCategories();
    this.expenses = this.getExpenses();
  }

  private getExpenses(): Expense[] {
    let data: Expense[] = [];


    // TODO  when importing all the expenses: sort them in categories and sub cats.
    // TODO  --> show only the sum of that category and subcategory
    // TODO  --> --> when click: show last 5 expenses in that subc.
    this.serviceExpenses.getExpenses().subscribe(expenses => {
      // loop trough all the expenes
      for (let income of expenses) {
        data.push(income);

        //incomeDataC.push(income.amount);
      }
    });
    return data;
  }

  protected getExpensesOf(categoryId: number):Expense[]{
    let data: Expense[] = [];
    for (let expense of this.expenses) {
      if(expense.subCategoryFk == categoryId && expense.subCategoryFk != 0){
        data.push(expense);
      }
    }
    return data;
  }

  protected getSumAmounts(expenses: Expense[]): number {
    let sum: number = 0;

    for (let expense of expenses){
      sum += expense.amount;
    }

    return sum;
  }



  private getCategories() {

    let data: Category[] = [];

    this.serviceCategories.getCategories().subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        data.push(category);

        if(category.subCategoryFk != 0){

        }
      }
    });
    return data;
  }

  setShowStateSubLayer(id: number, name: string) {
    $('section.category #'+id.toString()+name.substr(0,4)).toggleClass("show");
  }

  protected getLastExpenseOf(categoryId: Number): Expense[] {
    let data: Expense[] = [];
    for (let expense of this.expenses) {
      if(expense.id == categoryId){
        data.push(expense);
      }

      if (data.length > 0){
        return data;
      }
    }
    return data;
  }


}

