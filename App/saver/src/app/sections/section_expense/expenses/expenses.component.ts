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
import {Company} from "../../../models/Company";

@Component({
  selector: 'app-expenses',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {

  constructor(protected serviceExpenses: ExpenseService,
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
    this.getCategories();
    this.getExpenses();

    console.log(this.network.online+" network");

    this.reloadService.change.subscribe(month => {
        this.refresh();
    });



  }

  private getExpenses()  {
    this.expenses = [];


    // TODO  when importing all the expenses: sort them in categories and sub cats.
    // TODO  --> show only the sum of that category and subcategory
    // TODO  --> --> when click: show last 5 expenses in that subc.


    this.serviceExpenses.getExpensesOf(this.reloadService.month+1, this.reloadService.year,"subcategoryFk").subscribe(expenses => {
      // loop trough all the expenes
      for (let expense of expenses) {
        this.expenses.push(expense);

      }
    });

  }

  protected getExpensesOf(cat: Category):Expense[]{
    let expenses: Expense[] = [];

    this.expenses.filter(obj => {
      if (obj.subcategoryFk === cat.id){
        expenses.push(obj);
      }
    });

    return expenses;


    // return this.serviceExpenses.getExpensesOfcategory(cat, this.expenses);
  }


  protected getAllExpensesOfMain(cat: Category):Expense[]{
    return this.serviceExpenses.getExpensesOfmainCategory(cat, this.expenses);
  }



  trackByFn(index, item) {
    return index; // or item.id
  }

  mainCategories: Category[] = [];
  subCategories: Category[] = [];

  private getCategories() {
    this.mainCategories = [];
    this.subCategories = [];

    this.serviceCategories.getExpenseCategories(this.reloadService.month+1, this.reloadService.year, "onlyMain").subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        this.mainCategories.push(category);
      }
    });


    this.serviceCategories.getExpenseCategories(this.reloadService.month+1, this.reloadService.year, "all").subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        this.subCategories.push(category);

        if(category.subCategoryFk != 0){

        }
      }
    });


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
    return this.serviceExpenses.getLastExpenseOfCategory(categoryId, this.expenses);
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
      expense = new Expense(null, null, null, null, null, new Date(), null, null, null, null, null, 0);
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
     this.getCategories();

    // this.getExpenses();

  }

  manageCompany(company: Company) {
    //Set add/ edit vars
    this.addViewService.isEdit(company !== null);

    //manage new Expense
    if (company === null) {
      company = new Company( null, null, null, null, null, null, null,null,null);
    }

    //set the expense in the service
    this.addViewService.setCompany(company);
  }
  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  formatDate(dateI: Date): string {
    let date = new Date(dateI);
    let curr_date = date.getDay();
    let curr_month = date.getMonth();
    let curr_year = date.getFullYear();
    return(this.monthnames[curr_month] + " " + curr_date + ", " + curr_year);
  }
}

