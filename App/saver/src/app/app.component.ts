import { Component } from '@angular/core';
import * as $ from "jquery"
import {Spinkit} from "ng-http-loader";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SaverApp';

  public spinkit = Spinkit;

}



