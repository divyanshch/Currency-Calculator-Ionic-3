import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';

/*
import {Device} from 'ionic-native';
*/
/*
  Generated class for the ApiCalls provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class ApiCalls {
    url: any;
    constructor(public http: Http) {
        console.log('Hello ApiCalls Provider');
        this.url = 'http://api.fixer.io/latest?';
    }
    //gets the currency from fixer.io
  getCurrency(baseCurrency){
      var test = this.url + 'base='+baseCurrency;
      console.log('url', test);
      return this.http.get(test)
          .map((res) => res.json());
          
  }
  //gets JSON object created by me
   getCurrencyDetailsPrototype(){
      var test = 'data/currencyDetail.json'
      console.log('url', test);
      return this.http.get(test)
          .map((res) => res.json());
          
  }
    ////////////////////////////////////
 
}
