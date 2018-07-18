import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from '../../providers/http-service/http-service';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-query-history',
  templateUrl: 'query-history.html',
})
export class QueryHistoryPage {
  query_history: any = [];
  query_keys: any;
  mobile: string = '';

  constructor(public navCtrl: NavController, public navParams: NavParams, private httpServiceProvider: HttpServiceProvider,
    private storage: Storage
  ) {
    this.storage.get('user_detail').then((data) => {
      if (data != null) {
        // alert('storage not null')
        // alert(JSON.parse(data));
        this.mobile = data['mobile']
        // alert(this.mobile);
      } else {
        // alert('storage null')
      }
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QueryHistoryPage');
  }

  ionViewDidEnter() {
    let user_dict = {};
    user_dict['user_id'] = 3
    this.httpServiceProvider.getQueryHistoryByUser(user_dict).subscribe((data) => {
      console.log(data);
      this.query_history = data;
      this.query_keys = Object.keys(data);
      console.log(this.query_keys);
    }, (error) => {
      console.log(error);
    });


    this.httpServiceProvider.getFarmerQueries().subscribe((data) => {
      console.log(data);
    });
  }
}
