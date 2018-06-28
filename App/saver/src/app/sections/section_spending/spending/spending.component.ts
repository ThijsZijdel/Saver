import { Component, OnInit } from '@angular/core';
import {Chart} from "angular-highcharts";
import {SpendingService} from "../service_spending/spending.service";
import {Spending} from "../../../models/Spending";
import {BehaviorSubject} from "rxjs/index";
import {CategoryService} from "../../../data/service/service_category/category.service";
import {BudgetService} from "../../section_budget/service_budget/budget.service";
import {Category} from "../../../models/Category";
import {Expense} from "../../../models/Expense";
import {catchOffline} from "@ngx-pwa/offline";
import {ExpenseService} from "../../section_expense/service_expense/expense.service";

import * as $ from "jquery"


@Component({
  selector: 'app-spending',
  templateUrl: './spending.component.html',
  styleUrls: ['./spending.component.css']
})
export class SpendingComponent implements OnInit {

  constructor(private serviceSpending: SpendingService,
              private serviceCategories: CategoryService,
              private serviceBudgets: BudgetService,
              private serviceExpenses: ExpenseService) { }

  chart: Chart;

  spendings: Spending[] = [];
  spendingData: dataObj[] = [];

  totalBudgetSpend: number = 0;

  categories: Category[] = [];

  expenses: Expense[] = [];

  ngOnInit() {
    this.getSpendings();
    this.getTotalBudgetSpend();
    this.categories = this.getCategories();

    this.expenses = this.getExpenses();
    setTimeout(()=>{
      this.init();
    }, 500);
  }

  private getCategories() {

    let data: Category[] = [];

    this.serviceCategories.getCategories().subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        data.push(category);
      }
    });
    return data;
  }
  private getCatName(subcategoryFk: number):string {

    for (let cat of this.categories){
      if (cat.id == subcategoryFk){
        return cat.name;
      }
    }
  }

  private getTotalBudgetSpend(){
    this.totalBudgetSpend = 0;

    this.serviceBudgets.getBudgets().subscribe(budgets => {
      // loop trough all the expenes
      for (let budget of budgets) {

        this.totalBudgetSpend += (budget.amountStart-budget.amountLeft);
        //incomeDataC.push(income.amount);
      }
    });
  }

  private getSpendings() {
    //TODO the spendings should be collected in groups, sorted and the sum of the amounts for each category!
    //TODO This way they can be all loaded into the chart


    this.serviceSpending.getSpendings().subscribe(spendings => {
      this.spendingData = [];
      this.spendings = [];

      // loop trough all the incomes
      for (let spending of spendings) {
        this.spendings.push(spending);

        //this.getCatName(spending.subcategoryFk)

        this.spendingData.push( new dataObj(spending.subcategoryFk.toString(), spending.amount) );

      }
    });
  }



  protected toggleTooltipSub(classe: string) {
    let parent = 'div.sub-layer.'+classe;
    $(parent).find('.subCategoryLbl span.tooltipPerc').fadeToggle();
  }


  init() {
      let chart = new Chart({
        chart: {
          height: '100%',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie'
        },
        title: {
          text: ''
        },
        tooltip: {
          borderColor: 'rgba(205,205,205,0.8)',
          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: ['#EB7092', '#D23556', '#FF6E1F', '#FFBB28', '#4BCA81',
              '#00AEEF', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#B8E986'],
            dataLabels: {
              enabled: false
            }
          }
        },
        credits: {
          enabled: false
        },
        series: [{
          name: 'Categories',
          innerSize: '75%',
          data: this.spendingData
        }]

      });


      this.chart = chart;


      chart.ref$.subscribe(console.log);





  }


  getPercentage(category: Spending):number {
    return 14;
  }

  private getExpenses(): Expense[] {
    let data: Expense[] = [];


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
  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  formatDate(dateI: Date): string {
    let date = new Date(dateI);
    let curr_date = date.getDay();
    let curr_month = date.getMonth();
    let curr_year = date.getFullYear();
    return(this.monthnames[curr_month] + " " + curr_date + ", " + curr_year);
  }

  getColor(spending: Spending): string {
    return "blue";
  }

  setShowStateSubLayer(id: number, name: string) {
    let element: string = 'ul.expenses-seperate#'+id.toString()+name.substr(0,4);

    $(element).toggleClass("show");
  console.log(element+" <<<f")
    let time = 0;

    if ($(element).hasClass('relative')){
      time = 100;
    }

    setTimeout(()=>{
      $(element).toggleClass("relative");
    }, time);


  }
}









export class dataObj {
  name: string;
  y: number;

  constructor(name: string, y: number) {
    this.y = y;
    this.name = name;
  }
}
