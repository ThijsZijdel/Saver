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

  /**
   * Transaction variables
   */
  DISPL_AMOUNT_TRANS: number = 50;

  displayedTransactions: number = this.DISPL_AMOUNT_TRANS;
  transactions: TransactionBulk[] = [];

  @Input('expenses') expenses: Expense[] = [];
  @Input('incomes') incomes: Income[] = [];


  /**
   * Message variables
   */
  lengthDataTypeName: string;
  message: string = null;


  /**
   * General variables
   */
  monthnames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];



  // category: Category = null;

  /**
   * Data arrays
   */
  balances: Balance[] = null;
  companies: Company[] = null;

  categories: Category[] = null;
  mainCategories: Category[] = null;
  subCategories: Category[] = null;


  /**
   * File data variables
   */
  file: any;
  extension: string;

  data = null;
  parsedData = null;

  //Buttons
  fileUploadDisabled = false;
  parserDisabled = false;
  converterDisabled = false;

  /**
   * Keys
   */
  keys: keysOptions[] = [];
  transactionKeys: string[] = [];

  // Datum; 0
  // Naam / Omschrijving; 1
  // Rekening; 2
  // Tegenrekening; 3
  // Code; 4
  // Af Bij; 5
  // Bedrag (EUR); 6
  // MutatieSoort; 7
  // Mededelingen 8

  fields: number = 7;

  // expenseVal: JsonVal[] = [];
  // incomesVal: JsonVal[] = [];





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
      for (let category of categories) {
        this.categories.push(category);
      }
    });
  }
  private getBalances(){
    this.balances = [];

    this.serviceBalances.getBalances().subscribe(balances => {
      for (let balance of balances) {
        this.balances.push(balance);
      }
    });
  }

  private getCompanies() {
    this.companies = [];

    this.serviceCompany.getCompanies().subscribe(companies => {
      for (let company of companies) {
        this.companies.push(company);
      }
    });
  }

  /**
   * Input type=file  on change, validate extension
   * > upload the event.file
   *
   * @param $event Target.file
   */
  public fileChanged($event): void {
    this.file = $event.target.files[0];
    this.message = "File selected."

    // get the file extension
    this.extension = this.file.name.split('.').pop();

    //Validate extension
    if (this.extension !== 'json' && this.extension !== 'csv') {
      this.message = "Wrong file format uploaded. Please reset & reupload."
    } else {
      this.message = "Correct file format uploaded."
      setTimeout(() => {
        this.uploadDocument(this.file);
      }, 100);
    }
  }

  /**
   * Upload Document by reading the file
   * @param file that will be read
   */
  public uploadDocument(file: any): void {
    let fileReader = new FileReader();

    //Read the file
    fileReader.onload = (e) => {
      this.data = fileReader.result;
    };
    fileReader.readAsText(this.file);

    this.lengthDataTypeName = "Atributes";
    this.message = "File read."
  }

  /**
   * Parser for the uploaded file.
   *  data: any => parsedData: json
   *
   * @param none: file's stored local by: this.uploadDocument()
   */
  public parse():void  {
    //Check witch way of parsing is needed
    switch (this.extension) {
      case "csv":
        let json = this.CsvToJson(this.data);
        this.parsedData = JSON.parse(json);
        break;
      case "json":
        this.parsedData = JSON.parse(this.data);
        break;
      default:
        this.message = "File parsing of " + this.extension + " not supported yet."
        break;
    }

    this.getParsedKeys();

    // Set appropriate messages
    this.lengthDataTypeName = "Transactions";
    this.message = "Json parsed."
  }


  /**
   * Convert csv file to json array
   * by calling this.csvToArray
   *
   * @param csv: file with data
   */
  CsvToJson(csv) {
    //Get the data array of the @param csv file
    let dataArray = BulkAddViewComponent.csvToArray(csv, null);

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

  /**
   * Convert csv (text) file to an data array
   * @param strData : csv file
   * @param strDelimiter: what will split the values. null = ,
   * @return any[][]: generated array with data
   */
  static csvToArray(strData, strDelimiter): any[][] {

    // Assign the delimiter for RegExp
    strDelimiter = (strDelimiter || ",");

    // REGULAR EXPRESSION to parse the CSV values.
    let objPattern = new RegExp((
      "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +  // Delimiters
      "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +         // Quoted fields
      "([^\"\\" + strDelimiter + "\\r\\n]*))")    // Standard fields
      , "gi"
    );

    let data = [[]];
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
        var strMatchedValue = arrMatches[2].replace(new RegExp("\"\"", "g"), "\"");
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

  /**
   * Converting json to usable objects 
   */
  convert(){
    //Iterators for the id's
    let expenseIteratorId: number = 0;
    let incomeIteratorId: number = 0;

    let generalIteratorId: number = 0;

    //Loop trough all the transactions of the parsed file
    for (let transaction of this.parsedData) {
      transaction.mainCategories = this.mainCategories;
      transaction.subCategories = this.subCategories;

      //get transaction company based on a few criteria
      let company = this.getCompany(transaction.Tegenrekening);

        //EXPENSE
      if (BulkAddViewComponent.isExpense(transaction)) {

        let newExpense = this.genExpense(transaction,expenseIteratorId,company);

        //Local expenses array
        this.expenses.push(newExpense);

        //Set new transaction code based on the gen. id
        transaction.code = expenseIteratorId;

        this.transactions.push(
          new TransactionBulk(
              generalIteratorId, //id
              newExpense,        //generated Expense
              transaction,       //read Json object
              null,
            null)
        );
        expenseIteratorId++;


      } //INCOME
      else if (!BulkAddViewComponent.isExpense(transaction)){

        let newIncome = this.genIncome(transaction,incomeIteratorId,company);

        //Local incomes array
        this.incomes.push(newIncome);

        //Set new transaction code based on the gen. id
        transaction.code = incomeIteratorId;

        this.transactions.push(
          new TransactionBulk(
              generalIteratorId,  // id
            null,
            null,
              newIncome,          // generated Income
            transaction)          // read Json object
        );

        incomeIteratorId++;
      }

      generalIteratorId++;
    }

    this.message = "Converted."
  }

  /**
   * Generate expense obj based on the given params
   * @param transaction
   * @param expenseIteratorId
   * @param company
   */
  private genExpense(transaction, expenseIteratorId: number, company: Company) {
    return new Expense(
      expenseIteratorId,
      transaction.NaamOmschrijving,
      transaction.Bedrag,
      null,
      transaction.Mededelingen,
      this.getDate(transaction),
      this.monthnames[this.getDate(transaction).getMonth()-1],
      this.getDate(transaction).getMonth(),
      company.subCategoryFk,
      1,
      company.id,
      1);
  }

  /**
   * Generate income obj based on the given params
   * @param transaction
   * @param incomeIteratorId
   * @param company
   */
  private genIncome(transaction, incomeIteratorId: number, company: Company) {
    return new Income(
      incomeIteratorId,
      transaction.NaamOmschrijving,
      transaction.Bedrag,
      null,
      transaction.Mededelingen,
      this.getDate(transaction),
      this.monthnames[this.getDate(transaction).getMonth()-1],
      this.getDate(transaction).getMonth(),
      company.subCategoryFk,
      company.id,
      1);
  }

  /**
   * Get the company for some more transaction information.
   * > based on the iban of that transaction.
   * @param iban
   */
  private getCompany(iban: string) {
    //TODO check on more points than just iban: --> so more automatic
    let companyG: Company = new Company(null,null,null,null,null,null,null);
    for (let company of this.companies){
      if (iban === company.iban){
        companyG = company;
      }
    }
    return companyG;
  }


  /**
   * Reset all the file information, transactions, data, fields and variables
   */
  reset():void {

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
    //todo export transaction to api
  }


  /**
   * Check if transaction is expense
   * @param transaction
   */
  static isExpense(transaction: JsonVal) {
    return transaction.AfBij === "Af";
  }

  /**
   * Get the right date object based on the : YYYYMMDD format
   * @param date YYYYMMDD format
   */
  private getDate(tst: JsonVal): Date {
    let date = tst.Datum.toString();


    return new Date(
        parseFloat(date.substr(0, 4)), //year
        parseFloat(date.substr(4, 2)), //month
        parseFloat(date.substr(6, 2))  //day
    )
  }


  /**
   * Normal parse float for inline html calls
   * @param txt
   * @return num
   */
  static parseFloat(txt: string): number{
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

  /**
   * Manage expense context menu
   * @param expense
   */
  manageExpense(expense: Expense) {
    //Set add/ edit vars
    this.addViewService.isEdit(expense !== null);

    //manage new Expense
    if (expense === null) {
      expense = new Expense(null, null, null, null, null, null, null, null, null, null, null, 0);
    }

    //set the expense in the service
    this.addViewService.setExpense(expense);
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




