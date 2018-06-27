import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent implements OnInit {

  budgetSpend: number = 2600;
  totalBudget: number = 3563.52;

  constructor() { }

  ngOnInit() {


  }

}
