import { Component, OnInit } from '@angular/core';
import {JSONSchema, LocalStorage} from "@ngx-pwa/local-storage";
import {SettingsService} from "./settings.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
