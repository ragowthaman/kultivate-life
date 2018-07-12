import {Injectable} from '@angular/core';
import {GlobalProvider} from '../global/global';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {Storage} from '@ionic/storage';


@Injectable()
export class HttpServiceProvider {
  headers: Headers;

  constructor(public http: Http, private global: GlobalProvider, private storage: Storage) {
    console.log('Hello HttpServiceProvider Provider');
  }

  appendTokenToHeader(token = null) {
    if (token == null) {
      let token = ''
      this.storage.get('user_detail').then((data) => {
        token = data['token']
      })
      this.headers.append('Authorization', 'Token ' + token);
    }
  }

  eraseTokenFromHeader() {
    this.storage.clear().then((data) => {
      console.log('storage cleared');
    }, (error) => console.log(error));
  }

  signup(data) {
    return this.http.post(this.global.base_url + 'main/signup/', data, {})
  }

  login(data) {
    return this.http.post(this.global.base_url + 'main/login/', data, {})
      .map((res) => res.json())
  }

  confirmSignupOtp(data) {
    return this.http.post(this.global.base_url + 'main/confirm/signup/otp/', data, {})
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

  uploadUserQuery(data) {
    return this.http.post(this.global.base_url + 'main/upload/user/query/images/', data);
  }

  getCrops() {
    return this.http.get(this.global.base_url + 'main/serve/corp/')
      .map((res) => res.json());
  }

  getQueryHistoryByUser(data) {
    return this.http.post(this.global.base_url + 'main/get/query/history/by/user/', data)
      .map((res) => res.json());
  }

}
