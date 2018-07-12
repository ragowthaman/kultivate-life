import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpServiceProvider } from '../../../providers/http-service/http-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  query_history: any[] = [];

  constructor(public navCtrl: NavController, private httpServiceProvider: HttpServiceProvider) {
  }
  
  ionViewDidEnter() {
    let user_dict = {};
    user_dict['user_id'] = 3
    this.httpServiceProvider.getQueryHistoryByUser(user_dict).subscribe((data) => {
      console.log(data);
      this.query_history = data;
    }, (error) => {
      console.log(error);
    });
  }

}
