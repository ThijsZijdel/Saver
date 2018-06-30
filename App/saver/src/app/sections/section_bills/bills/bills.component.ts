import { Component, OnInit } from '@angular/core';
import {ExpenseService} from "../../section_expense/service_expense/expense.service";
import {Expense} from "../../../models/Expense";

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.css']
})
export class BillsComponent implements OnInit {

  overdueTotal:number = 92.70;

  overdueBills: Expense[] = [];
  billBills: Expense[] = [];
  paidBills: Expense[] = [];

  overdueShown:number = 2;
  overBtnText: string = "More Overdue bills ";
  overBtnAlternative: string = "Less Overdue bills ";
  overBtnNormal: string = "More Overdue bills "


  billsShown:number = 2;
  billsBtnText: string = "More bills ";
  billsBtnAlternative: string = "Less bills ";
  billsBtnNormal: string = "More bills "

  paidShown:number = 2;
  paidBtnText: string = "More Paid bills ";
  paidBtnAlternative: string = "Less Paid bills ";
  paidBtnNormal: string = "More Paid bills "


  constructor(private expenseService: ExpenseService) { }
  constructor() { }

  ngOnInit() {

  }

}
