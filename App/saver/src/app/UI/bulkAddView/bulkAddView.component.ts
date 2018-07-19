import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../data/categories/service_category/category.service";
import {Category} from "../../models/Category";
import {Expense} from "../../models/Expense";

@Component({
  selector: 'app-bulkAddView',
  templateUrl: './bulkAddView.component.html',
  styleUrls: ['./bulkAddView.component.css']
})
export class BulkAddViewComponent implements OnInit {

   category: Category = null;

  categories: Category[] = null;

  @Input() expense: Expense = new Expense(null,null,null,null,null,null,null,null,null,null,null,null)

  constructor(private serviceCategories: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }


  private getCategories() {

    this.categories = [];

    this.serviceCategories.getCategories().subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        this.categories.push(category);

        if(category.subCategoryFk != 0){

        }
      }
    });

  }

  file:any;

  dataCSV: string;

  fileChanged($event) {
    this.file = $event.target.files[0];
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {

      console.log(fileReader.result);
      this.dataCSV = fileReader.result;
    }
    fileReader.readAsText(this.file);
  }

  fields: number = 7;
  parse(){
     let csvArray = this.dataCSV.split(';');
     let count: number = 0;
     let expenses: Expense[] = [];

     for(let atr of csvArray){
       let strings: string[] = [];
        if (count !== this.fields){
          strings.push(atr);
        } else {
          expenses.push(new Expense(null,strings[1],null,null, null, null,null,null,null,null,null,null))
        }
     }
  }


  submitForm(){

  }
}
