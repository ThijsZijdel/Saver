import {Component, OnInit, ViewChild} from '@angular/core';
import {ExpenseService} from "../service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {CategoryService} from "../../../data/service/service_category/category.service";
import {Category} from "../../../models/Category";

import {catchOffline, Network} from '@ngx-pwa/offline';

import * as $ from "jquery"
import {ContextMenuComponent} from "ngx-contextmenu";

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

  public items = [
    { name: 'John', otherProperty: 'Foo' },
    { name: 'Joe', otherProperty: 'Bar' }
  ];

  // @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  @ViewChild(ContextMenuComponent) public categoryMenu: ContextMenuComponent;
  @ViewChild(ContextMenuComponent) public expenseMenu: ContextMenuComponent;


  showMessage(mes: string){
    console.log(mes+" <test")
  }





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
      for (let expense of expenses) {
        data.push(expense);

        //incomeDataC.push(income.amount);
      }
    });
    return data;
  }

  protected getExpensesOf(cat: Category):Expense[]{
    let data: Expense[] = [];

    for (let expense of this.expenses) {
      if(expense.subcategoryFk == cat.id && expense.subcategoryFk != 0){
        data.push(expense);
      }
    }
    return data;
  }
  protected getAllExpensesOfMain(cat: Category):Expense[]{
    let data: Expense[] = [];

    for (let expense of this.expenses) {
      if (expense.subcategoryFk === cat.id  ||
        expense.subcategoryFk === cat.subCategoryFk) {
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
      if(expense.subcategoryFk == categoryId){
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



  getAmountExpensesMain(id: number):number {
    let sum: number = 0;

    for (let expense of this.expenses) {

      //todo check for recursive call?
      if (this.getMainCategoryId(expense.subcategoryFk) == id || expense.subcategoryFk == id){
        sum++;
      }
    }
    return sum;
  }
  protected getAmountExpensesSub(id: number): number {
    let sum: number = 0;

    for (let expense of this.expenses) {

      //todo check for recursive call?
      if(expense.subcategoryFk == id){
        sum++;
      }
    }
    return sum;
  }

  toggleTooltips(){
    $('.tooltipPerc').toggleClass("hidden");
  }


}

