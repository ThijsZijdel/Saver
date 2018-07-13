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
import * as Highcharts from "highcharts";


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

  colors: string[] = ['#EB7092', '#D23556', '#FF6E1F', '#FFBB28', '#4BCA81',
    '#00AEEF', '#eeaaee', '#55BF3B', '#DF5353', '#7798BF', '#B8E986'];

  totalSpendAmout: number = 0;

  ngOnInit() {
    this.getSpendings();
    this.getTotalBudgetSpend();
    this.categories = this.getCategories();

    this.expenses = this.getExpenses();
    setTimeout(()=>{
      this.init();
    }, 500);
  }

  /**
   * Get categories
   *
   * @returns {Category[]}
   */
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

  /**
   * Get all the spendings
   */
  private getSpendings() {
    //TODO the spendings should be collected in groups, sorted and the sum of the amounts for each category!
    //TODO This way they can be all loaded into the chart

    this.serviceSpending.getSpendings().subscribe(spendings => {
      this.spendingData = [];
      this.spendings = [];
      this.totalSpendAmout = 0;

      // loop trough all the incomes
      for (let spending of spendings) {
        this.spendings.push(spending);

        //this.getCatName(spending.subcategoryFk)

        this.spendingData.push( new dataObj(spending.name, spending.amount, spending.subcategoryFk ) );
        this.totalSpendAmout += spending.amount;

      }
    });
  }

  /**
   * Get all the expenses of .. //todo this month
   * @returns {Expense[]}
   */
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

  /**
   * Get expenses based on category fk.
   *
   * @param {number} categoryFk
   * @returns {Expense[]}
   */
  protected getExpensesOf(categoryFk: number):Expense[]{
    let data: Expense[] = [];

    for (let expense of this.expenses) {
      if(expense.subCategoryFk == categoryFk && expense.subCategoryFk != 0) {
        data.push(expense);
      }
    }
    return data;
  }

  /**
   * Get the name of an category based on it's id
   * @param {number} subcategoryFk
   * @returns {string}
   */
  private getCatName(subcategoryFk: number):string {

    for (let cat of this.categories){
      if (cat.id == subcategoryFk){
        return cat.name;
      }
    }
  }

  /**
   * By looping trough the budgets and calculate the spend.
   */
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

  /**
   * Get percentage of spending by cat.
   *
   * @param {Spending} category
   * @returns {string}
   */
  getPercentage(category: Spending):string {
    let percentage: number = ((category.amount/this.totalSpendAmout)*100);

    return (percentage.toString()).substr(0,percentage.toString().indexOf('.')+2)+"%";
  }


  monthnames: string[] = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

  /**
   * get the formatted date based on the month names
   * @param {Date} dateI
   * @returns {string}
   */
  formatDate(dateI: Date): string {
    let date = new Date(dateI);
    let curr_date = date.getDay();
    let curr_month = date.getMonth();
    let curr_year = date.getFullYear();
    return(this.monthnames[curr_month] + " " + curr_date + ", " + curr_year);
  }

  /**
   * Get the color of an spending based on the id
   *
   * @param {Spending} spending
   * @returns {string}
   */
  getColor(spending: Spending): string {
    if (spending.id < this.colors.length)
      return this.colors[spending.id];
  }

  /**
   * Toggle the tooltip
   *
   * @param {string} classe
   */
  protected toggleTooltipSub(classe: string) {
    // todo 'Class..."   is to abstract
    let parent = 'div.sub-layer.'+classe;

    console.log('div.sub-layer.'+classe)
    $(parent).find('.subCategoryLbl span.tooltipPerc').fadeToggle();
  }

  // /**
  //  * show sub layer state
  //  * @param {number} id
  //  * @param {string} name
  //  */
  // setShowStateSubLayer(id: number, name: string) {
  //   // todo --> state sub layer   cleanup --> classes !
  //
  //   let element: string = 'ul.expenses-seperate#'+id.toString()+name.substr(0,4);
  //
  //   $(element).toggleClass("show");
  //
  //   let time = 0;
  //
  //   if ($(element).hasClass('relative')){
  //     time = 100;
  //   }
  //
  //   setTimeout(()=>{
  //     $(element).toggleClass("relative");
  //   }, time);
  //
  //
  // }

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


  /**
   * Initialize the PIE chart.
   */
  init() {
      let chart = new Chart({
        chart: {
          height: '100%',
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: 'pie',

          events: {
            click: function(e) {
              console.log(
                Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', e.xAxis[0].value),
                e.yAxis[0].value
              )
            }
          }
        },
        title: {
          text: ''
        },
        tooltip: {
          borderColor: 'rgba(205,205,205,0.8)',
          pointFormat: '{series.name.slice(0, -1)}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            colors: this.colors,
            dataLabels: {
              enabled: false
            },
            events: {
              click: function (event) {

                //todo --> if two methods are cleaned up --> easier to use


                let classe: string =  event.point.name+'-'+event.point.name+'-'+event.point.category;

                console.log("search in:'div.sub-layer.'+"+classe)
                $('div.sub-layer.'+classe).find('.subCategoryLbl span.tooltipPerc').fadeToggle();


                  $("ul.expenses-seperate").removeClass("show");
                  $("ul.expenses-seperate").removeClass("relative");
                  let element: string = 'ul.expenses-seperate#'+event.point.category.toString()+event.point.name.substr(0,4);


                  $(element).toggleClass("show");

                  let time = 0;

                  if ($(element).hasClass('relative')){
                    time = 100;
                  }

                  setTimeout(()=>{
                    $(element).toggleClass("relative");
                  }, time);



              }
            },
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

}









export class dataObj {
  name: string;
  y: number;
  category: number;

  constructor(name: string, y: number, category: number) {
    this.y = y;
    this.name = name;
    this.category = category;
  }
}
