import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ApiCalls } from '../../providers/api-calls';
import { CurrencyDetailPage } from '../currency-detail/currency-detail';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  baseCurrency:string;
  baseFlag:string;
  currencyDetail:any;
  finalResult: any = [];
  countries:any=[];
  sortNumber:any=1;

  constructor(public navCtrl: NavController, public navParams: NavParams, private ApiCall:ApiCalls,public alertCtrl: AlertController) {
    //sets base currency if starting a fresh app or if starting after app is killed
    if (!window.localStorage.getItem('baseCurrency')) {
      this.baseCurrency = 'usd';
      window.localStorage.setItem('baseCurrency', this.baseCurrency);
    }
    else{
      this.baseCurrency = window.localStorage.getItem('baseCurrency');
    }
    this.getCurrencyDetails();
   
  }

  getCurrency() {
    //gets the currency response from fixer.io
    this.ApiCall.getCurrency(this.baseCurrency).subscribe(
      (data) => {
        console.log(data)
        //reset the outputlists
        this.finalResult=[];
        let fixedCountries = []
        
        for (let countryCode in data.rates){
          let lowerCountryCode = countryCode.toLowerCase();
          this.currencyDetail[lowerCountryCode].countryExchangeRate = data.rates[countryCode]
          let exchangeRate=0
          //makes sure there are at least 1 nonzero didgits and fixed point is more than 2
          for(let x=2;x<String(this.currencyDetail[lowerCountryCode]).length;x++){
            if (x==2 && this.currencyDetail[lowerCountryCode].countryExchangeRate.toFixed(x)>0){
              exchangeRate=this.currencyDetail[lowerCountryCode].countryExchangeRate.toFixed(x)
              break;
            }
            else if (this.currencyDetail[lowerCountryCode].countryExchangeRate.toFixed(x)>0){
              exchangeRate=this.currencyDetail[lowerCountryCode].countryExchangeRate.toFixed(x+1)
              break;
            }
          }
          //all the information is put into a list to keep track of all the country information
          fixedCountries.push({
            'countryName':this.currencyDetail[lowerCountryCode].countryName,
            'countryCode':countryCode.slice(0,countryCode.length - 1),
            'countryCurrencyCode':countryCode,
            'countryExchangeRate':exchangeRate,
            'countryFlag':this.currencyDetail[lowerCountryCode].countryFlagUrl,
          })
        }
        //the result is saved for use in search and filtering to reset the data
        window.localStorage.setItem('final_result', JSON.stringify(fixedCountries));
        this.filterCountries(fixedCountries)
        console.log(this.finalResult)
       
      },
      error => {
          console.log(error.json().error.message);
      });
  }
  getCurrencyDetails() {
      //gets the JSON made for this project
      this.ApiCall.getCurrencyDetailsPrototype().subscribe(
      (data) => {
        this.currencyDetail = data;
        //sets the baseflag so the header can be updated
        this.baseFlag= this.currencyDetail[this.baseCurrency].countryFlagUrl; 
        this.getCurrency()
      },
      error => {
          console.log(error.json().error.message);
      });
    }

  //pushes detail page and passese base currency info and second currency info
  currencyDetails(result){
    console.log(result)
    this.navCtrl.push(CurrencyDetailPage, {
      result: result[0],
      baseCurrency:this.baseCurrency,
      baseFlag:this.baseFlag
    });
  }

  //changes the base currency
  changeBase(){
    console.log('changing base',this.countries);
    this.countries=[];
    //loads the alert list for proper output
     for(let x in this.currencyDetail){
            if (x.toLowerCase()==this.baseCurrency.toLowerCase()){
              console.log(x)
              this.countries.push({
                type: 'radio',
                label: this.currencyDetail[x].countryName +"    (  "+x.toUpperCase()+'   )',
                value: x,
                checked: true
              });
            }
            else{
              this.countries.push({
                type: 'radio',
                label: this.currencyDetail[x].countryName +"    (  "+x.toUpperCase()+'   )',
                value: x,
                checked: false
              });
            }
            
        }
    //sort countries by their name
    this.countries.sort((a,b)=>{
      return String(a.label.toLowerCase()).localeCompare(String(b.label.toLowerCase()))
    });   
    // start alert to let user select the base currency
    let alert = this.alertCtrl.create({
      title: 'Base Currency',
      inputs: this.countries,
      buttons : [
        {
          text: 'Cancel'
        },
        {
          text: 'Ok',
          handler: (data: any) => {
            console.log('Radio data:', data);
            this.baseCurrency = data;
            window.localStorage.setItem('baseCurrency', this.baseCurrency);
            
            this.baseFlag= this.currencyDetail[this.baseCurrency].countryFlagUrl; 
            this.getCurrency()
          }
        }
      ]
    });
 
    alert.present();
  }

  //this is for the sorting cycle (1,2,3,4):(A-Z Country Name, A-Z Country code, 0-9 increasing Exchange Rate,
  // 9-0 decreasing Exchange Rate)
  sortFinalResult(){
    console.log(this.sortNumber)
    //gets the resetted data
    let data = JSON.parse(window.localStorage.getItem('final_result'))
    //sort by country name A-Z
    if(this.sortNumber==1){
      console.log('sorted by country name');
      this.filterCountries(data);    
    }
    //sort by country code A-Z
    else if(this.sortNumber==2){
      console.log('sorted by country code');
      data.sort((a,b)=>{
        return String(a.countryCurrencyCode.toLowerCase()).localeCompare(String(b.countryCurrencyCode.toLowerCase()))
      });
      this.sortNumber=3;
    }
    //sort by 0-9 increasing
    else if(this.sortNumber==3){
      console.log('sorted by increasing order');
      data.sort((a,b)=>{
        return a.countryExchangeRate-b.countryExchangeRate
      });
      this.sortNumber=4;
    }
    //sort by 9-0 decreasing
    else if(this.sortNumber==4){
      console.log('sorted by decreasing order');      
      data.sort((a,b)=>{
        return b.countryExchangeRate-a.countryExchangeRate
      });
      this.sortNumber=1;
    }
   
    this.finalResult=data;
  }

  //searches through the country name and the country code
  searchInput(ev: any) {
    if (ev.target.value) {
        console.log('searcher', ev.target.value);
        var searcher = ev.target.value
        searcher = searcher.toLowerCase();
        var data = JSON.parse(window.localStorage.getItem('final_result'))
        data = data.filter(function (x) {
            return x.countryName.toLowerCase().includes(searcher) || x.countryCurrencyCode.toLowerCase().includes(searcher);
        });
        this.filterCountries(data)
    }
    else {
      this.filterCountries(JSON.parse(window.localStorage.getItem('final_result')));
    }
  }

  //Alphabatizes and sets the final result to be outputted
  filterCountries(data) {
    console.log('filter',data);
    if(data.length!=0){
      data.sort((a,b)=>{
        return String(a.countryName.toLowerCase()).localeCompare(String(b.countryName.toLowerCase()))
      });      
      this.sortNumber=2
      this.finalResult=data;
      console.log(this.finalResult)
    
    }  
    else{
      console.log('nothinggggg')
      this.finalResult=[];
    }
  }
}
