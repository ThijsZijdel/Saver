import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../data/categories/service_category/category.service";
import {Category} from "../../models/Category";
import {Expense} from "../../models/Expense";
import {Income} from "../../models/Income";
import {IngJson} from "../../models/json/JsonVal";

@Component({
  selector: 'app-bulkAddView',
  templateUrl: './bulkAddView.component.html',
  styleUrls: ['./bulkAddView.component.css']
})
export class BulkAddViewComponent implements OnInit {

  category: Category = null;

  categories: Category[] = null;

  mainCategories: Category[] = null;
  subCategories: Category[] = null;

  message: string = null;

  lengthDataType: string;

  file: any;

  data = null;
  imports: IngJson[] = [];

  @Input('expenses') expenses: Expense[] = [];
  @Input('incomes') incomes: Income[] = [];

  constructor(private serviceCategories: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();

    setTimeout(()=>{
      this.filterCategories();
    }, 100);

  }


  private getCategories() {

    this.categories = [];

    this.serviceCategories.getCategories().subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        this.categories.push(category);

      }
    });

  }


  fileChanged($event) {
    this.file = $event.target.files[0];
    this.message = "File selected."

    setTimeout(()=>{
      this.uploadDocument(this.file);
    }, 100);


  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {

      this.data = fileReader.result;
    }
    fileReader.readAsText(this.file);

    this.lengthDataType = "Atributes";
    this.message = "File read."
  }

  // Datum; 0
  // Naam / Omschrijving; 1
  // Rekening; 2
  // Tegenrekening; 3
  // Code; 4
  // Af Bij; 5
  // Bedrag (EUR); 6
  // MutatieSoort; 7
  // Mededelingen 8

  fields: number = 8;
  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];


  parse() {
    this.data = JSON.parse(this.data);

    // Rekening

    // Tegenrekening

    // Mutatiesoort

    let iteratorId: number = 0;
    for (let tst of this.data) {
      if (this.isExpense(tst)) {
        this.expenses.push(
          new Expense(
            iteratorId,
            tst.NaamOmschrijving.substr(0,6),
            tst.Bedrag,
            null,
            tst.NaamOmschrijving,
            this.getDate(tst),
            this.monthnames[this.getDate(tst).getMonth()-1],
            this.getDate(tst).getMonth(),
            null,
            null,
            null,
            1)
        );

        tst.code = iteratorId;
        this.imports.push(tst);

      } else {
        this.incomes.push(
          new Income(
            iteratorId,
            tst.NaamOmschrijving.substr(0,6),
            tst.Bedrag,
            null,
            tst.NaamOmschrijving,
            this.getDate(tst),
            this.monthnames[this.getDate(tst).getMonth()-1],
            this.getDate(tst).getMonth(),
            null,
            null,
            1)
        );

        tst.code = iteratorId;
        this.imports.push(tst);
      }

      iteratorId++;
    }


    this.lengthDataType = "Transactions";
    this.message = "Json parsed."

  }


  submitForm() {

  }


  isExpense(transaction: IngJson) {
    return transaction.AfBij === "Af";
  }

  private getDate(tst: IngJson): Date {
    let date = tst.Datum.toString();

    return new Date(
        parseFloat(date.substr(0, 4)), //year
        parseFloat(date.substr(4, 2)), //month
        parseFloat(date.substr(6, 2))  //day
    )
  }



  parseFloat(txt: string): number{
    return parseFloat(txt);
  }

  private filterCategories() {
    this.mainCategories = [];
    this.subCategories = [];


    for (let cat of this.categories){
      if (cat.subCategoryFk === 0) {
        this.mainCategories.push(cat);
      } else {
        this.subCategories.push(cat);
      }
    }
  }

  getSubCategories(id: number) {
    if (id == 99){
      this.filterCategories();
      return;
    }
    this.subCategories = [];
    for (let cat of this.categories){
      if (cat.subCategoryFk === id){
        this.subCategories.push(cat);
      }
    }
  }


}







