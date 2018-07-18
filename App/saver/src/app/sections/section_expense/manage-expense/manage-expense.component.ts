import {Component, Input, OnInit} from '@angular/core';
import {AddViewsService} from "../../../UI/addViews/service_addViews/addViews.service";
import {Expense} from "../../../models/Expense";
import {Observable} from "rxjs/internal/Observable";
import {Category} from "../../../models/Category";
import {CategoryService} from "../../../data/service/service_category/category.service";

@Component({
  selector: 'app-manage-expense',
  templateUrl: './manage-expense.component.html',
  styleUrls: ['./manage-expense.component.css']
})
export class ManageExpenseComponent implements OnInit {

   expense: Expense;

  categories: Category[];


  constructor(protected addView: AddViewsService,
              private serviceCategories: CategoryService) { }

  ngOnInit() {
    this.expense = this.addView.getExpense();
    this.categories = this.getCategories();
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

}
