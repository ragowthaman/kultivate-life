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
    // this.appendTokenToHeader();
    this.storage.get('user_detail').then((data) => {
      if (data != null) {
        let token = data['token'];
        console.log(token)
        this.headers.append('Authorization', 'Token ' + token);
        // this.headers.append('Authorization', 'Token ' + '77060ecdd51fea5748e9059dde434f2083ef0a6c');
        console.log(this.headers);
      }
    });
  }

  appendTokenToHeader(token) {
    // this.headers.append('Authorization', 'Token ' + '77060ecdd51fea5748e9059dde434f2083ef0a6c');
    this.headers.append('Authorization', 'Token ' + token);
    console.log(this.headers);
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
    console.log(this.headers)
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
    // alert(JSON.stringify(this.headers));
    return this.http.post(this.global.base_url + 'main/upload/user/query/images/', data, {headers: this.headers});
  }

  getCrops() {
    return this.http.get(this.global.base_url + 'main/serve/corp/', {headers: this.headers})
      .map((res) => res.json());
  }

  getQueryHistoryByUser(data) {
    return this.http.post(this.global.base_url + 'main/get/query/history/by/user/', data, {headers: this.headers})
      .map((res) => res.json());
  }

  getQueryDetail(data) {
    return this.http.post(this.global.base_url + 'main/get/query/detail/', data, {headers: this.headers})
      .map((res) => res.json());
  }

  getFarmerQueries() {
    return this.http.get(this.global.base_url + 'main/serve/farmer/queries/', {headers: this.headers})
      .map((res) => res.json());
  }

  getQueryDetails(data) {
    return this.http.post(this.global.base_url + 'main/serve/query/information/', data, {headers: this.headers})
      .map((res) => res.json());
  }

  getAppVersion() {
    return this.http.get(this.global.base_url + 'main/serve/kultivate/life/app/version/', {headers: this.headers})
      .map((res) => res.json());
  }

  getCropAgeUnits() {
    return this.http.get(this.global.base_url + 'main/serve/crop/age/units/', {headers: this.headers})
      .map((res) => res.json());
  }

}
