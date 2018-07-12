import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {FormGroup, Validators, FormBuilder} from "@angular/forms";
import { HttpServiceProvider } from './../../../providers/http-service/http-service';
import { GlobalProvider } from './../../../providers/global/global';
import { Storage } from '@ionic/storage'
import { TabsPage } from "../tabs/tabs";
import {LoginPage} from "../login/login";

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  public signup_form: FormGroup;
  is_otp_created: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private formBuilder: FormBuilder, private global: GlobalProvider,
              private httpServiceProvider: HttpServiceProvider,  private toastCtrl: ToastController, private storage: Storage) {
    this.signup_form = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      village: ['', Validators.required],
      mobile: ['', Validators.compose([Validators.required, Validators.pattern('[0-9]{10}')])],
      pincode: ['', Validators.compose([Validators.pattern('[0-9]{6}')])],
    });
    console.log('signup')

  }

   signUp() {
    if (!this.signup_form.valid) {
      alert('Form not valid');
      return false;
    }
    console.log(this.signup_form.value);
    this.signup_form.value.first_name = this.signup_form.value.first_name[0].toUpperCase() + this.signup_form.value.first_name.slice(1)
    this.signup_form.value.last_name = this.signup_form.value.last_name[0].toUpperCase() + this.signup_form.value.last_name.slice(1)
    this.signup_form.value.village = this.signup_form.value.village[0].toUpperCase() + this.signup_form.value.village.slice(1)
    console.log(this.signup_form.value.first_name)
    this.httpServiceProvider.signup(this.signup_form.value).subscribe((data) => {
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
    console.log(this.signup_form.value.mobile);
    if (otp === undefined || otp == '') {
      alert("Please enter OTP");
      return false;
    }
    let otp_data = {
      'otp': otp,
      // 'mobile': '9585488448'
      'mobile': this.signup_form.value.mobile
    };
    this.httpServiceProvider.confirmSignupOtp(otp_data).subscribe((data) => {
      console.log(data);
      let success_message = data['message'];
      this.displayToast(success_message, 'middle');
      this.storage.set('user_detail', data['user_detail']);
      this.httpServiceProvider.appendTokenToHeader(data['user_detail']['token']);
      this.navCtrl.push(TabsPage)
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
    this.navCtrl.pop();
  }

}
