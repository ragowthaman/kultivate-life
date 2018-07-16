import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";


@IonicPage()
@Component({
  selector: 'page-farmer-query-list',
  templateUrl: 'farmer-query-list.html',
})
export class FarmerQueryListPage {
  farmer_query_list: any = {};
  available_crop_names: string[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpServiceProvider: HttpServiceProvider) {
    this.httpServiceProvider.getFarmerQueries().subscribe((data) => {
      console.log(data);
      this.farmer_query_list = data;
      this.available_crop_names = Object.keys(data);
    }, (error) => console.log(error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FarmerQueryListPage');
  }

  routeQuery(query_id) {
    this.navCtrl.push('QueryInformationPage', {'query_id': query_id});
  }

}
