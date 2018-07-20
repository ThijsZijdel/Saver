import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../data/categories/service_category/category.service";
import {Category} from "../../models/Category";
import {Expense} from "../../models/Expense";
import {Income} from "../../models/Income";

@Component({
  selector: 'app-bulkAddView',
  templateUrl: './bulkAddView.component.html',
  styleUrls: ['./bulkAddView.component.css']
})
export class BulkAddViewComponent implements OnInit {

  category: Category = null;

  categories: Category[] = null;

  @Input('expenses') expenses: Expense[] = [];
  @Input('incomes') incomes: Income[] = [];

  constructor(private serviceCategories: CategoryService) {
  }

  ngOnInit() {
    this.getCategories();
  }


  private getCategories() {

    this.categories = [];

    this.serviceCategories.getCategories().subscribe(categories => {
      // loop trough all the categories
      for (let category of categories) {
        this.categories.push(category);

        if (category.subCategoryFk != 0) {

        }
      }
    });

  }

  file: any;

  data;
  imports: Import[] = [];

  fileChanged($event) {
    this.file = $event.target.files[0];
  }

  uploadDocument(file) {
    let fileReader = new FileReader();
    fileReader.onload = (e) => {

      console.log(fileReader.result);
      this.data = fileReader.result;
    }
    fileReader.readAsText(this.file);
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

    for (let tst of this.data) {
      if (this.isExpense(tst)) {
        this.expenses.push(new Expense(null, tst.NaamOmschrijving.substr(0,6), tst.Bedrag, null, tst.NaamOmschrijving, this.getDate(tst), this.monthnames[this.getDate(tst).getMonth()-1],  this.getDate(tst).getMonth(), null, null, null, 1)
        )
      } else {
        this.incomes.push(new Income(null, tst.NaamOmschrijving.substr(0,6), tst.Bedrag, null, tst.NaamOmschrijving, this.getDate(tst),  this.monthnames[this.getDate(tst).getMonth()-1],  this.getDate(tst).getMonth(), null, null,  1)
        )
      }
    }

  }


  submitForm() {

  }


  isExpense(transaction: Import) {
    return transaction.AfBij === "Af";
  }

  private getDate(tst: Import): Date {
    let date = tst.Datum.toString();
    console.log("date:"+new Date(
      parseFloat(date.substr(0, 4)), //year
      parseFloat(date.substr(4, 2)), //month
      parseFloat(date.substr(6, 2))  //day
    ))
    return new Date(
        parseFloat(date.substr(0, 4)), //year
        parseFloat(date.substr(4, 2)), //month
        parseFloat(date.substr(6, 2))  //day
    )
  }

}
export class Import{
  Datum: number;
  NaamOmschrijving: string;
  Rekening: string;
  Tegenrekening: string;
  Code: string;
  AfBij: string;
  Bedrag;
  MutatieSoort: string;
  Mededelingen: string;


  constructor(Datum: number,
    NaamOmschrijving: string,
    Rekening: string,
    Tegenrekening: string,
    Code: string,
    AfBij: string,
    Bedrag,
    MutatieSoort: string,
    Mededelingen: string
  ){
    this.Datum = Datum;
    this.NaamOmschrijving = NaamOmschrijving;
    this.Rekening = Rekening;
    this.Tegenrekening = Tegenrekening;
    this.Code = Code;
    this.AfBij = AfBij;
    this.Bedrag = Bedrag;
    this.MutatieSoort = MutatieSoort;
    this.Mededelingen = Mededelingen;

  }
}

