import { Component, OnInit } from '@angular/core';
import {Income} from "../../../models/Income";
import {IncomeService} from "../service_income/income.service";

@Component({
  selector: 'app-add-income',
  templateUrl: './add-income.component.html',
  styleUrls: ['./add-income.component.css']
})
export class AddIncomeComponent implements OnInit {

  constructor(private incomeService: IncomeService) { }

  ngOnInit() {
  }

  protected addIncome(income: Income) {
    this.incomeService.addIncome(new Income(99, "test", 400, null,"test desc", new Date(), "feb", 2, 1, 0, 1) );
  }
}
