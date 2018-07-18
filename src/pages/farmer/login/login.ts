// import {GlobalProvider} from './../../../providers/global/global';
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {HttpServiceProvider} from './../../../providers/http-service/http-service';
import {SignUpPage} from "../sign-up/sign-up";
import {TabsPage} from "../tabs/tabs";
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public login_form: FormGroup;
  is_otp_created: boolean = true;
  // is_otp_created: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private httpServiceProvider: HttpServiceProvider, private storage: Storage) {
    this.login_form = this.formBuilder.group({
      mobile: ['', Validators.compose( [Validators.required, Validators.pattern('[0-9]{10}')])],
    });

    // check localstorage null or not null
    // storage.get('user_detail').then((data) => {
    //   if (data != null) {
    //     this.httpServiceProvider.appendTokenToHeader(data['token'])
    //     this.navCtrl.setRoot(TabsPage)
    //   }
    // });
  }

  logIn() {
    if (!this.login_form.valid) {
      alert('Form not valid');
      return false;
    }
    console.log(this.login_form.value);
    this.httpServiceProvider.login(this.login_form.value).subscribe((data) => {
      alert(data['message']);
      this.is_otp_created = true;
      console.log(data)
      // this.displayToast(data['message'], 'top');
    }, (error) => {
      // alert('error');
      let error_message = JSON.parse(error._body)['error'];
      alert(error_message);
      console.log(error);
    }, () => {
      console.log('complete');
    })
  }

  confirmLoginOtp(otp: number) {
    let otp_data = {
      'otp': otp,
      'mobile': 9585488448
      // 'mobile': this.login_form.value.mobile
    };

    this.httpServiceProvider.confirmLoginOtp(otp_data).subscribe((data) => {
      console.log(data);
      this.httpServiceProvider.appendTokenToHeader(data['user_detail']['token']);
      this.navCtrl.push(TabsPage);
      this.storage.set('user_detail', data['user_detail']);
    }, (error) => {
      let error_message = JSON.parse(error._body)['error'];
      alert(error_message)
      console.log(JSON.parse(error._body));
    });
  }

  resendLoginOtp() {
    let data = {'mobile': this.login_form.value.mobile}
    this.httpServiceProvider.resendLoginOtp(data).subscribe((data) => {
      console.log('resend otp success');
    }, (error) => console.log('resend otp error'))
  }

  // displayToast(message: string, position: string) {
  //   let toast = this.toastCtrl.create({
  //     message: message,
  //     position: position,
  //     duration: 3000
  //   });
  //   toast.present();
  // }

  routeSignupPage() {
    this.navCtrl.push(SignUpPage);
  }

  routeTabPage() {
    this.navCtrl.push(TabsPage);
  }

}
