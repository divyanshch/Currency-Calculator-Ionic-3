import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CurrencyDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-currency-detail',
  templateUrl: 'currency-detail.html',
})
export class CurrencyDetailPage {
  result:any;
  baseCurrency:string;
  baseFlag:string;
  secondFlag:any;
  secondcountryCurrencyCode:any;
  multiplier:any;
  firstFlag:any;
  firstcountryCurrencyCode:any;
  operation:any='multiply';
  input:any=1;
  output:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.result = this.navParams.get('result');
    this.baseCurrency = this.navParams.get('baseCurrency');
    this.baseFlag = this.navParams.get('baseFlag');
    this.firstFlag = this.baseFlag;
    this.firstcountryCurrencyCode= this.baseCurrency;
    this.secondFlag = this.result.countryFlag;
    this.secondcountryCurrencyCode=this.result.countryCurrencyCode;
    this.multiplier = this.result.countryExchangeRate;
    console.log(this.result);
    this.submit();
  }

  //allows for swapping the arithmetics to see the oppostite currency
  swapBaseCurrency(){
    //multiply
    if(this.baseCurrency==this.firstcountryCurrencyCode){
      this.firstcountryCurrencyCode=this.secondcountryCurrencyCode;
      this.firstFlag=this.secondFlag;
      this.secondcountryCurrencyCode=this.baseCurrency;
      this.secondFlag=this.baseFlag
      this.operation = 'divide'
    }
    //divide
    else{
      this.secondcountryCurrencyCode=this.firstcountryCurrencyCode;
      this.secondFlag=this.firstFlag;
      this.firstcountryCurrencyCode=this.baseCurrency;
      this.firstFlag=this.baseFlag;
      this.operation = 'multiply'
    }
    this.input=1;
    this.submit();

  }
  //checks if all data of the output and input are proper and computes a solution
  submit(){
    let data = NaN;
    if(this.operation=='multiply'){
      data = this.input * this.multiplier
    }
    else if(this.operation=='divide'){
      data = this.input / this.multiplier
    }
    if(isNaN(data)){
      this.output="Invalid Input"
    }

    else{
      //check for length because after 20 characters toFixed doesnt work
      //this allows for there to be at least 2 fixed points and if not
      //2 numerical values at least 
      if(String(data).length<20){
        for(let x=2;x<String(data).length;x++){
          if(x==2&& Number(data.toFixed(x))>0){
            data=Number(data.toFixed(x))
          }
          else{
            if(x+2 < String(data).length)
              data=Number(data.toFixed(x+2))
            else
              data=Number(data.toFixed(x+1))
          }
        
        }
      }
      
      this.output = data;
    }
    console.log(this.output)
    
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad CurrencyDetailPage');
  }
  computeExchangeRate(input){
    //checks if input is at least 1 
    if(!input){
      input =1;
    }
    this.input=input;
    this.submit();
  }
}
