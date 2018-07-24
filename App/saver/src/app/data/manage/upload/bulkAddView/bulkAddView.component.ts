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
  extention: string;

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

    this.extention = this.file.name.split('.').pop();

    if (this.extention !== 'json' && this.extention !== 'csv') {
      this.message = "Wrong file format uploaded. Please reset & reupload."
    } else {
      this.message = "Correct file format uploaded."
      setTimeout(() => {
        this.uploadDocument(this.file);
      }, 100);
    }

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

    //Check witch way of parsing is needed
    switch (this.extention) {
      case "csv":
        let json = this.CsvToJson(this.data);
        console.log("data:")
        console.log(this.data);
        console.log("----------------------:")
        console.log("json:")
        console.log(json);
        console.log("----------------------:")
        this.parsedData = JSON.parse(json);

        console.log("parsed json:")
        console.log(this.parsedData)
        console.log("----------------------:")
        break;
      case "json":
        this.parsedData = JSON.parse(this.data);
        break;
      default:
        this.message = "File parsing of " + this.extention + " not supported yet."
        break;
    }


    this.getParsedKeys();

    this.lengthDataType = "Transactions";
    this.message = "Json parsed."


  }


  CsvToJson(csv) {
    //Get the data array of the @param csv file
    let dataArray = this.csvToArray(csv, null);

    let objArray = [];

    // Loop trough the entire array
    for (let i = 1; i < dataArray.length; i++) {

      // Add empty object
      objArray[i - 1] = {};

      //Loop trough the data of that object
      for (let k = 0; k < dataArray[0].length && k < dataArray[i].length; k++) {

        //Get the right key
        let key = dataArray[0][k];

        //Add the object to the array
        objArray[i - 1][key] = dataArray[i][k]
      }
    }

    let json = JSON.stringify(objArray);

    let str = json.replace(/},/g, "},\r\n");
    return str;
  }

  csvToArray(strData, strDelimiter) {

    // Assign the delimiter for RegExp
    strDelimiter = (strDelimiter || ",");

    // REGULAR EXPRESSION to parse the CSV values.
    let objPattern = new RegExp((
        // Delimiters
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +

      // Quoted fields
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +

      // Standard fields
      "([^\"\\" + strDelimiter + "\\r\\n]*))"),

      // Flags for the regExp
      "gi"
    );

    let data = [[]];

    // Hold our individual regEx matched groups.
    let arrMatches = null;

    // Loop over RegExp matches until last match.
    while (arrMatches = objPattern.exec(strData)) {

      // Delimiter that was found.
      let strMatchedDelimiter = arrMatches[1];

      // Given delimiter has a length + matches field delimiter  --> delimiter is a row delimiter.
      if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
        data.push([]);
      }

      // kind of value (quoted or unquoted).
      if (arrMatches[2]) {
        // Quoted value unescape any double quotes.
        let strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
      } else {
        // Non-quoted value
        var strMatchedValue = arrMatches[3];
      }

      // Add value string
      data[data.length - 1].push(strMatchedValue);
    }
    // Return the parsed data
    return (data);
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

      let company = this.getCompany(tst.Tegenrekening);

      if (this.isExpense(tst)) {

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
          tst.NaamOmschrijving,
          tst.Bedrag,
          null,
          tst.Mededelingen,
          this.getDate(tst),
          this.monthnames[this.getDate(tst).getMonth()-1],
          this.getDate(tst).getMonth(),
          company.subCategoryFk,
          company.id,
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

  private getParsedKeys() {
    let parsedKeys =  Object.keys(this.parsedData[0]);

    this.keys = [];
    for (let key of parsedKeys){
      this.keys.push(new keysOptions(key,false,null,null,null))
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




