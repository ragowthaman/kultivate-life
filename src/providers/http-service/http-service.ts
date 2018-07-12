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
    this.headers = new Headers();
    this.appendTokenToHeader();
  }

  appendTokenToHeader(token:any=null) {
    if (token == null) {
      this.storage.get('user_detail').then((data) => {
        if (data != null) {
          token = data['token'];
          this.headers.append('Authorization', 'Token ' + token);
        }
      });
    } else {
      this.headers.append('Authorization', 'Token ' + token);
    }
  }

  eraseTokenFromHeader() {
    this.storage.clear().then((data) => {
      console.log('storage cleared');
    }, (error) => console.log(error));
  }

  signup(data) {
    return this.http.post(this.global.base_url + 'main/signup/', data, {headers: this.headers})
  }

  login(data) {
    return this.http.post(this.global.base_url + 'main/login/', data, {headers: this.headers})
      .map((res) => res.json())
  }

  confirmSignupOtp(data) {
    return this.http.post(this.global.base_url + 'main/confirm/signup/otp/', data, {headers: this.headers})
      .map((res) => res.json());
  }

  confirmLoginOtp(data) {
    return this.http.post(this.global.base_url + 'main/confirm/login/otp/', data, {headers: this.headers})
      .map((res) => res.json());
  }

  resendOtp(data) {
    return this.http.post(this.global.base_url + 'main/resend/otp/', data, {headers: this.headers});
  }

  resendLoginOtp(data) {
    return this.http.post(this.global.base_url + 'main/resend/login/otp/', data, {headers: this.headers});
  }

  uploadUserQuery(data) {
    return this.http.post(this.global.base_url + 'main/upload/user/query/images/', data, {headers: this.headers});
  }

  getCrops() {
    console.log(this.global.base_url);
    console.log(this.headers);
    // alert(this.global.base_url);
    return this.http.get(this.global.base_url + 'main/serve/corp/', {headers: this.headers})
      .map((res) => res.json());
  }

  getQueryHistoryByUser(data) {
    return this.http.post(this.global.base_url + 'main/get/query/history/by/user/', data, {headers: this.headers})
      .map((res) => res.json());
  }

}
