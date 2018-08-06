import { Component, OnInit } from '@angular/core';
import {AddViewsService} from "../../data/manage/addViews/service_addViews/addViews.service";

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  constructor(public AddViewService: AddViewsService) { }

  ngOnInit() {
  }

}
