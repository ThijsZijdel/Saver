import { Component, OnInit } from '@angular/core';
import {AddViewsService} from "./service_addViews/addViews.service";

@Component({
  selector: 'app-addViews',
  templateUrl: './addViews.component.html',
  styleUrls: ['./addViews.component.css']
})
export class AddViewsComponent implements OnInit {

  /**
   * Constructor with a connection to the addViews Service
   * @param {MessageService} addViews, application messages
   * @author: Thijs Zijdel
   */
  constructor(public addViews: AddViewsService) {}


  ngOnInit() {

  }

}
