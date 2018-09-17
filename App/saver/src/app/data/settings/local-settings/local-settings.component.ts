import { Component, OnInit } from '@angular/core';
import {JSONSchema, LocalStorage} from "@ngx-pwa/local-storage";
import {LocalSettingsService} from "../service-localSettings/local-settings.service";

@Component({
  selector: 'app-local-settings',
  templateUrl: './local-settings.component.html',
  styleUrls: ['./local-settings.component.css']
})
export class LocalSettingsComponent implements OnInit {

  constructor(protected localStorage: LocalStorage,
              protected localSettingsService: LocalSettingsService) { }

  ngOnInit() {


    let user: User = { name: 'Henris', pas: '123' };

    // this.localStorage.setItem('ddfsdff', user).subscribe(() => {});

    setTimeout(()=>{
      this.localStorage.getItem<User>('ddfsdff').subscribe((user) => {
        console.log(user.name); // should be 'Henris'
        console.log(" wtff set ?? set")
        //optional
        // Done
      }, () => {
        // Error
        //optional
        console.log("error, not set")

      });
    }, 500);



    // delete 1
    // this.localStorage.removeItem('user').subscribe(() => {});

    // delete all
    // this.localStorage.clear().subscribe(() => {});

    // get item

  }


  //TODO -> no local settings set?
  //TODO --> get local DEFAULT settings from db with settings service
  //TODO  ===> store in local settings service


  //TODO -> reload?, check for local storage
  //TODO --> get local storage and ==> store in settings service
  //TODO                           --? re get DEFAULTS from settings service db


  //TODO --> make settings accessible from local settings Service @

  //TODO --> make locala settings component UI + reload func.
  //TODO ---> Store user changes in local storage (settings)

  //TODO -----?> make overwirte option for defaults in db



  //TODO --> NODE JS  api part + db

  public changeSetting(setting: Setting): void{
    try {
      eval(setting.methodName+"()");
    } catch (e) {
      console.log(e.message)
    }

  }

  public toggleTooltip() {
    console.log("hi");
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
  }
}
export class Setting {
  name: string;
  value: number;
  methodName: string;

  constructor(name: string, value: number, methodName: string){
    this.name = name;
    this.value = value;
    this.methodName = methodName;
  }
}
