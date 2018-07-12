import { GlobalProvider } from './../../../providers/global/global';
import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from "@angular/forms";
import { HttpServiceProvider } from './../../../providers/http-service/http-service';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public login_form: FormGroup;
  is_otp_created: boolean = false;
  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private toastCtrl: ToastController, private global: GlobalProvider, private httpServiceProvider: HttpServiceProvider) {
    this.login_form = this.formBuilder.group({
      mobile: ['1234567890', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])],
    });
  }

  logIn() {
    console.log(this.login_form.value);
    this.httpServiceProvider.test(this.login_form.value).subscribe((data) => {
      this.is_otp_created = true;
    }, (error) => {
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
      'mobile': this.login_form.value.mobile
    };

    this.httpServiceProvider.confirmLoginOtp(otp_data).subscribe((data) => {
      console.log(data);
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

}
