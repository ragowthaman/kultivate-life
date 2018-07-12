import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import { HttpServiceProvider } from './../../../providers/http-service/http-service';
import { GlobalProvider } from './../../../providers/global/global';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public signup_form: FormGroup;
  is_otp_created: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private global: GlobalProvider, private httpServiceProvider: HttpServiceProvider,  private toastCtrl: ToastController) {
    this.signup_form = this.formBuilder.group({
      first_name: ['fa', Validators.required],
      last_name: ['fsaf', Validators.required],
      village: ['fa', Validators.required],
      mobile: ['1234567890', Validators.compose([Validators.maxLength(10), Validators.minLength(10), Validators.required])],
      pincode: ['534353', Validators.compose([Validators.maxLength(6), Validators.minLength(6)])],
    });
  }

   signUp() {
    console.log(this.signup_form.value);
    this.signup_form.value.first_name = this.signup_form.value.first_name[0].toUpperCase() + this.signup_form.value.first_name.slice(1)
    this.signup_form.value.last_name = this.signup_form.value.last_name[0].toUpperCase() + this.signup_form.value.last_name.slice(1)
    this.signup_form.value.village = this.signup_form.value.village[0].toUpperCase() + this.signup_form.value.village.slice(1)
    console.log(this.signup_form.value.first_name)
    this.httpServiceProvider.test(this.signup_form.value).subscribe((data) => {
      this.is_otp_created = true;
    }, (error) => {
      let error_message = JSON.parse(error._body)['error'];
      alert(error_message);
      console.log(error);
    }, () => {
      console.log('complete');
    })
  }

  confirmOtp(otp) {
    console.log(otp);
    if (otp === undefined || otp == '') {
      alert("Please enter OTP");
      return false;
    }
    let otp_data = {
      'otp': otp,
      'mobile': this.signup_form.value.mobile
    };
    this.httpServiceProvider.confirmOtp(otp_data).subscribe((data) => {
      console.log(data);
      let success_message = JSON.parse(data._body)['message'];
      this.displayToast(success_message, 'middle')
    }, (error) => {
      let error_message = JSON.parse(error._body)['error'];
      alert(error_message)
      // this.displayToast(error_message, 'middle');
      console.log(JSON.parse(error._body));
      // console.log(JSON.parse(error));
    });
  }

  resendOtp() {
    let data = {'mobile': this.signup_form.value.mobile}
    this.httpServiceProvider.resendOtp(data).subscribe((data) => {
      console.log('resend otp success');
      console.log('resend otp success');
    }, (error) => console.log('resend otp error'))
  }

  displayToast(message: string, position: string) {
    let toast = this.toastCtrl.create({
      message: message,
      position: position,
      duration: 3000
    });
    toast.present();
  }

  navigateLoginPage() {
    this.navCtrl.push('LoginPage')
  }

}
