import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {CategoryService} from "../../../data/service/service_category/category.service";
import {Category} from "../../../models/Category";

import {catchOffline, Network} from '@ngx-pwa/offline';

import * as $ from "jquery"

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(private serviceExpenses: ExpenseService,
              private serviceCategories: CategoryService,
              protected network: Network) { }

  expenses: Expense[] = [];
  categories: Category[] = [];

  ngOnInit() {
    this.categories = this.getCategories();
    this.expenses = this.getExpenses();

    console.log(this.network.online+" network")


  }

  private getExpenses(): Expense[] {
    let data: Expense[] = [];


    // TODO  when importing all the expenses: sort them in categories and sub cats.
    // TODO  --> show only the sum of that category and subcategory
    // TODO  --> --> when click: show last 5 expenses in that subc.
    this.serviceExpenses.getExpenses().pipe(catchOffline()).subscribe(expenses => {
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

  setShowStateSubLayer(mainClasse:string, name: string, id: number) {

    // ".mainClasse  .id-name"
    let element: string = '.'+mainClasse+'.'+name+'-'+id;
    console.log(element+" el")

    $(element+' ul').first().toggleClass("show");


    $(element+' .icon-subcat').toggleClass("down");

    let time = 0;

    if ($(element+' ul').first().hasClass('relative')){
      time = 100;
    }

    setTimeout(()=>{
      $(element+' ul').first().toggleClass("relative");
    }, time);


  }

  protected getLastExpenseOf(categoryId: Number): Expense[] {
    let data: Expense[] = [];
    for (let expense of this.expenses) {
      if(expense.subCategoryFk == categoryId){
        data.push(expense);
      }

      if (data.length > 0){
        return data;
      }
    }
    return data;
  }


  getColor(category: Category): string {
    return category.color;
  }


  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  formatDate(dateI: Date): string {
    let date = new Date(dateI);
    let curr_date = date.getDay();
    let curr_month = date.getMonth();
    let curr_year = date.getFullYear();
    return(this.monthnames[curr_month] + " " + curr_date + ", " + curr_year);
  }

  protected getSumSubCats(id: number):number {
    let sum: number = 0;

    for (let category of this.categories) {
      if(category.subCategoryFk == id && category.subCategoryFk != 0){
        sum++;
      }
    }
    return sum;
  }



  private getMainCategoryId(subCatId: number):number{
    for (let cat of this.categories){
      if (cat.id == subCatId){
        return cat.subCategoryFk;
      }
    }
    return 0;
  }

  protected toggleTooltip(classe: string) {
    let parent = 'section.category.'+classe;

    $(parent).find('.mainCategoryLbl span.tooltipPerc').fadeToggle();
  }

  protected toggleTooltipSub(classe: string) {
    let parent = 'div.sub-layer.'+classe;
    $(parent).find('.subCategoryLbl span.tooltipPerc').fadeToggle();
  }

  getAmountExpensesMain(id: number):number {
    let sum: number = 0;

    for (let expense of this.expenses) {

      //todo check for recursive call?
      if (this.getMainCategoryId(expense.subCategoryFk) == id || expense.subCategoryFk == id){
        sum++;
      }
    }
    return sum;
  }
  protected getAmountExpensesSub(id: number): number {
    let sum: number = 0;

    for (let expense of this.expenses) {

      //todo check for recursive call?
      if(expense.subCategoryFk == id){
        sum++;
      }
    }
    return sum;
  }
}

