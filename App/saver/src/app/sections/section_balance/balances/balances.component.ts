import {Component, Inject, OnInit} from '@angular/core';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Component({
  selector: 'app-balances',
  templateUrl: './balances.component.html',
  styleUrls: ['./balances.component.css']
})
export class BalancesComponent implements OnInit {

  constructor(@Inject(LOCAL_STORAGE) private storage: WebStorageService) {

  }

  public data:any=[];

  ngOnInit() {
  }



  saveInLocal(key, val): void {
    this.storage.set(key, val);
    this.data[key]= this.storage.get(key);
  }





  getFromLocal(key): void {
    this.data[key]= this.storage.get(key);

    console.log(this.data[key]+"< this.data[key]   || this.storage.get(key)> "+this.storage.get(key))
  }
}
