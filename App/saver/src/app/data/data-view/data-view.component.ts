import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../service/service_company/company.service";
import {Company} from "../../models/Company";
import {Category} from "../../models/Category";
import {Expense} from "../../models/Expense";
import {Income} from "../../models/Income";
import {CategoryService} from "../categories/service_category/category.service";
import {ExpenseService} from "../../sections/section_expense/service_expense/expense.service";
import {IncomeService} from "../../sections/section_income/service_income/income.service";

import * as $ from "jquery";

@Component({
  selector: 'app-data-view',
  templateUrl: './data-view.component.html',
  styleUrls: ['./data-view.component.css']
})
export class DataViewComponent implements OnInit {

  constructor(private serviceCompany: CompanyService,
              private serviceCategory: CategoryService,
              private serviceExpense: ExpenseService,
              private serviceIncome: IncomeService) { }

  companies: Company[] = null;
  categories: Category[] = null;
  expenses: Expense[] = null;
  incomes: Income[] = null;

  ngOnInit() {
     this.getCompanies();

     this.getCategories();

     this.getExpenses();

     this.getIncomes();


  }

  initializeTable(objects: Object[]):void{

    //get cols (keys)
    let col = [];
    for (let i = 0; i < objects.length; i++) {

      for (let key in objects[i]) {
        if (col.indexOf(key) === -1) {
          col.push(key);
        }
      }
    }

    //create table
    let table = document.createElement("table");

    //create table row
    let tr = table.insertRow(-1);

    //create table header
    for (let i = 0; i < col.length; i++) {
      var th = document.createElement("th");
      th.innerHTML = col[i];
      tr.appendChild(th);
    }

    //add the objects to the table
    for (let i = 0; i < objects.length; i++) {

      tr = table.insertRow(-1);

      for (let j = 0; j < col.length; j++) {
        let tabCell = tr.insertCell(-1);
        tabCell.innerHTML = objects[i][col[j]];
      }
    }

    //initialize the table
    $("#data-container").html(table)

  }


  private getCompanies():void {
    this.companies = [];

    this.serviceCompany.getCompanies().subscribe(companies => {
      // loop trough all the companies
      for (let company of companies) {
        this.companies.push(company);

        if(company.categoryFk != 0){

        }
      }
    });
  }

  private getCategories() {
    this.categories = [];

    this.serviceCategory.getCategories().subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        this.categories.push(category);
      }
    });
  }

  private getExpenses() {
    this.expenses = [];

    this.serviceExpense.getExpenses().subscribe(expenses => {
      // loop trough all the expenses
      for (let expense of expenses) {
        this.expenses.push(expense);
      }
    });
  }

  private getIncomes() {
    this.incomes = [];

    this.serviceIncome.getIncomes().subscribe(incomes => {
      // loop trough all the incomes
      for (let income of incomes) {
        this.incomes.push(income);

      }
    });
  }
}
