import {Component, Input, OnInit} from '@angular/core';
import {CategoryService} from "../../../categories/service_category/category.service";
import {Category} from "../../../../models/Category";
import {Expense} from "../../../../models/Expense";
import {Income} from "../../../../models/Income";
import {JsonVal} from "../../../../models/bulkAdd/JsonVal";
import {TransactionBulk} from "../../../../models/bulkAdd/TransactionBulk";
import {Balance} from "../../../../models/Balance";
import {BalanceService} from "../../../../sections/section_balance/service_balance/balance.service";
import {CompanyService} from "../../../service/service_company/company.service";
import {Company} from "../../../../models/Company";
import {AddViewsService} from "../../addViews/service_addViews/addViews.service";

@Component({
  selector: 'app-bulkAddView',
  templateUrl: './bulkAddView.component.html',
  styleUrls: ['./bulkAddView.component.css']
})
export class BulkAddViewComponent implements OnInit {

  amountOfHeaderFields = 9;

  DISPL_AMOUNT_TRANS: number = 50;
  category: Category = null;

  categories: Category[] = null;
  balances: Balance[] = null;
  companies: Company[] = null;

  transactions: TransactionBulk[] = []
  displayedTransactions: number = this.DISPL_AMOUNT_TRANS;

  mainCategories: Category[] = null;
  subCategories: Category[] = null;

  message: string = null;

  lengthDataType: string;

  file: any;

  data = null;
  parsedData = null;

  keys: keysOptions[] = [];

  transactionKeys: string[] = [];

  expenseVal: JsonVal[] = [];
  incomesVal: JsonVal[] = [];


  fileUploadDisabled = false;
  parserDisabled = false;
  converterDisabled = false;


  @Input('expenses') expenses: Expense[] = [];
  @Input('incomes') incomes: Income[] = [];

  constructor(private serviceCategories: CategoryService,
              private serviceBalances: BalanceService,
              private serviceCompany: CompanyService,
              private addViewService: AddViewsService) {
  }

  ngOnInit() {
    this.getCategories();
    this.getBalances();
    this.getCompanies();

    setTimeout(()=>{
      this.filterCategories();
    }, 100);

    this.getTransactionKeys();
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
  private getBalances(){

    this.balances = [];

    this.serviceBalances.getBalances().subscribe(balances => {
      // loop trough all the categories
      for (let balance of balances) {
        this.balances.push(balance);

      }
    });

  }

  private getCompanies() {

    this.companies = [];

    this.serviceCompany.getCompanies().subscribe(companies => {
      // loop trough all the categories
      for (let company of companies) {
        this.companies.push(company);

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


    // this.data = this.csvJSON(this.data);
    this.parsedData = JSON.parse(this.data);

    let parsedKeys =  Object.keys(this.parsedData[0]);

    this.keys = [];
    for (let key of parsedKeys){
      this.keys.push(new keysOptions(key,false,null,null,null))
    }

    this.lengthDataType = "Transactions";
    this.message = "Json parsed."


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

  convert(){

    let expenseIteratorId: number = 0;
    let incomeIteratorId: number = 0;

    for (let tst of this.parsedData) {
      tst.mainCategories = this.mainCategories;
      tst.subCategories = this.subCategories;

      if (this.isExpense(tst)) {

        let company = this.getCompany(tst.Tegenrekening);

        let newExpense =
          new Expense(
            expenseIteratorId,
            tst.NaamOmschrijving,
            tst.Bedrag,
            null,
            tst.Mededelingen,
            this.getDate(tst),
            this.monthnames[this.getDate(tst).getMonth()-1],
            this.getDate(tst).getMonth(),
            company.subCategoryFk,
            1,
            company.id,
            1);

        this.expenses.push(newExpense);
        tst.code = expenseIteratorId;
        // this.expenseVal.push(tst);

        this.transactions.push(new TransactionBulk(null, newExpense, tst, null, null));



        expenseIteratorId++;

      } else {

        let newIncome = new Income(
          incomeIteratorId,
          tst.NaamOmschrijving.substr(0,6),
          tst.Bedrag,
          null,
          tst.NaamOmschrijving,
          this.getDate(tst),
          this.monthnames[this.getDate(tst).getMonth()-1],
          this.getDate(tst).getMonth(),
          null,
          null,
          1);

        this.incomes.push(newIncome);
        tst.code = incomeIteratorId
        // this.incomesVal.push(tst);

        this.transactions.push(new TransactionBulk(null, null, null, newIncome, tst));

        incomeIteratorId++;
      }


    }

    this.message = "Converted."
  }

  private getCompany(iban: string) {
    let companyG: Company = new Company(null,null,null,null,null,null,null);
    for (let company of this.companies){
      if (iban === company.iban){
        companyG = company;
      }
    }
    return companyG;
  }

  reset(){

    this.message = null;
    this.expenses = [];
    this.incomes = [];

    this.transactions = [];

    this.displayedTransactions = this.DISPL_AMOUNT_TRANS;

    this.file = null;
    this.data = null;
    this.parsedData = null;

  }
  submitForm() {

  }


  isExpense(transaction: JsonVal) {
    return transaction.AfBij === "Af";
  }

  private getDate(tst: JsonVal): Date {
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
    if (id === 9999){
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


  getSubCats(id: number): Category[] {
    let subCats: Category[] = [];

    for (let cat of this.categories){
      if (cat.subCategoryFk === id){
        subCats.push(cat);
      } else if (id === 9999){
        subCats.push(cat);
      }
    }
    return subCats;
  }

  companySelected(company: number, expense: Expense) {

  }

  private getTransactionKeys() {
    this.transactionKeys = [];

    let keys = Object.keys(
      new Expense(null,null,null,null,
        null,null,null,null,
        null,null,null,null)
    );
    for (let i = 0; i < keys.length; i++){
      if (keys[i] !== "monthName" && keys[i] !== "monthFk" && keys[i] !== "alreadyPaid" && keys[i] !== "id"){
        this.transactionKeys.push(keys[i]);
      }
    }
  }

  getBalanceName(balanceFk: number): string {
    for (let balance of this.balances){
      if (balance.id = balanceFk){
        return balance.name;
      }
    }

  }
}


export class keysOptions {
  name: string;
  isClicked: boolean;

  matchedAttribute: string;
  matchedAttributeId: number;

  isInfo: boolean;

  constructor(name: string, isClicked: boolean, matchedAttribute: string, matchedAttributeId: number, isInfo: boolean){
    this.name = name;
    this.isClicked = isClicked;
    this.matchedAttribute = matchedAttribute;
    this.matchedAttributeId = matchedAttributeId;
    this.isInfo = isInfo;
  }
}




