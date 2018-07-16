import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";


@IonicPage()
@Component({
  selector: 'page-query-information',
  templateUrl: 'query-information.html',
})
export class QueryInformationPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpServiceProvider: HttpServiceProvider) {
    console.log(this.navParams.data);
    let query_id = this.navParams.get('query_id');
    this.httpServiceProvider.getQueryDetails({'query_id': query_id}).subscribe((data) => {
      console.log(data);
    }, (error) => {
      console.log(error);
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QueryInformationPage');
  }

}
