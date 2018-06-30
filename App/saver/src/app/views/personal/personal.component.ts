import { Component, OnInit } from '@angular/core';
import {JSONSchema, LocalStorage} from "@ngx-pwa/local-storage";
import {SettingsService} from "./settings.service";

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.css']
})
export class PersonalComponent implements OnInit {

  constructor(protected localStorage: LocalStorage,
              public settingService: SettingsService) { }

  addExpenseBox: boolean = false;

  ngOnInit(){












    let user: User = { name: 'Henris', pas: '123' };

    this.localStorage.setItem('user', user).subscribe(() => {});

    // delete 1
    // this.localStorage.removeItem('user').subscribe(() => {});

    // delete all
    // this.localStorage.clear().subscribe(() => {});

    // get item
      this.localStorage.getItem<User>('user').subscribe((user) => {
        console.log(user.name); // should be 'Henris'

    //optional
        // Done
      }, () => {
        // Error
    //optional

      });
  }

  jsonSchem(){
    const schema: JSONSchema = {
      properties: {
        name: { type: 'string' },
        pas: { type: 'string' }
      },
      required: ['name', 'pas']
    };

    this.localStorage.getItem<User>('user', { schema }).subscribe((user) => {
      // Called if data is valid or null
    }, (error) => {
      // Called if data is invalid
    });
  }

}
export class User {
  name: string;
  pas: string;

  constructor(name: string, pas: string){
    this.name = name;
    this.pas = pas;
  constructor() { }

  ngOnInit() {
  }

}
