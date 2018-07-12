import { Injectable } from '@angular/core';
import { GlobalProvider } from '../global/global';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class HttpServiceProvider {
  headers: Headers;

  constructor(public http: Http, private global: GlobalProvider) {
    console.log('Hello HttpServiceProvider Provider');
  }

  test(data) {
    return this.http.post(this.global.base_url + 'main/test/', data, {})
  }

  confirmOtp(data) {
    return this.http.post(this.global.base_url + 'main/confirm/otp/', data, {})
      .map((res) => res.json());
  }

  confirmLoginOtp(data) {
    return this.http.post(this.global.base_url + 'main/confirm/login/otp/', data, {})
      .map((res) => res.json());
  }

  resendOtp(data) {
    return this.http.post(this.global.base_url + 'main/resend/otp/', data, {});
  }

  resendLoginOtp(data) {
    return this.http.post(this.global.base_url + 'main/resend/login/otp/', data, {});
  }

}
