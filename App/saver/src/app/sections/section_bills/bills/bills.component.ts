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

  constructor() { }

  ngOnInit() {

  }

}
