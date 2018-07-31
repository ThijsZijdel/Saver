import {Component, Input, OnInit} from '@angular/core';
import {AddViewsService} from "../../manage/addViews/service_addViews/addViews.service";
import {Category} from "../../../models/Category";
import {CategoryService} from "../service_category/category.service";

@Component({
  selector: 'app-manage-category',
  templateUrl: './manage-category.component.html',
  styleUrls: ['./manage-category.component.css']
})
export class ManageCategoryComponent implements OnInit {

   @Input() category: Category = null;

  categories: Category[] = null;


  constructor(protected addView: AddViewsService,
              private serviceCategories: CategoryService) { }

  ngOnInit() {
    this.category = this.addView.getCategory();
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

  submit(){
    console.log("Added category: "+this.category.name)
    this.serviceCategories.addCategory(this.category);
  }

}
