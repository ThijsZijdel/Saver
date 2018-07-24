import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {ExpenseService} from "../service_expense/expense.service";
import {Expense} from "../../../models/Expense";
import {CategoryService} from "../../../data/categories/service_category/category.service";
import {Category} from "../../../models/Category";

import {catchOffline, Network} from '@ngx-pwa/offline';

import * as $ from "jquery"
import {ContextMenuComponent} from "ngx-contextmenu";
import {AddViewsService} from "../../../data/manage/addViews/service_addViews/addViews.service";
import {ReloadService} from "../../section_budget/service_reload/reload.service";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(private serviceExpenses: ExpenseService,
              private serviceCategories: CategoryService,
              protected network: Network,
              protected addViewService: AddViewsService,
              protected reloadService: ReloadService) { }

  expenses: Expense[] = [];
  categories: Category[] = [];

  // @ViewChild(ContextMenuComponent) public basicMenu: ContextMenuComponent;

  @ViewChild(ContextMenuComponent) public categoryMenu: ContextMenuComponent;
  @ViewChild(ContextMenuComponent) public expenseMenu: ContextMenuComponent;


  showMessage(mes: string){
    console.log(mes+" <test")
  }





  ngOnInit() {
    this.categories = this.getCategories();
    this.getExpenses();

    console.log(this.network.online+" network");

    this.reloadService.change.subscribe(month => {
        this.refresh();
    });
    this.reloadService.change.subscribe(year => {
      this.refresh();
    });


  }

  private getExpenses()  {
    this.expenses = [];


    // TODO  when importing all the expenses: sort them in categories and sub cats.
    // TODO  --> show only the sum of that category and subcategory
    // TODO  --> --> when click: show last 5 expenses in that subc.


    this.serviceExpenses.getExpensesOf(this.reloadService.month, this.reloadService.year).pipe(catchOffline()).subscribe(expenses => {
      // loop trough all the expenes
      for (let expense of expenses) {
        this.expenses.push(expense);

      }
    });

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

  /**
   * Hide all the tooltips
   */
  toggleTooltips(){
    $('.tooltipPerc').toggleClass("hidden");

    $('.highcharts-tooltip').toggleClass("hidden");
  }





  manageExpense(expense: Expense) {
    //Set add/ edit vars
    this.addViewService.isEdit(expense !== null);

    //manage new Expense
    if (expense === null) {
      //todo get category if selected
      expense = new Expense(null, null, null, null, null, null, null, null, null, null, null, 0);
    }

    //set the expense in the service
    this.addViewService.setExpense(expense);
  }

  manageCategory(category: Category) {
    //Set add/ edit vars
    this.addViewService.isEdit(category !== null);

    //manage new Expense
    if (category === null) {
      category = new Category( null, null, null, null, null, null);
    }

    //set the expense in the service
    this.addViewService.setCategory(category);
  }

  private refresh() {
    this.getExpenses();
  }
}

