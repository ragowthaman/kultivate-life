import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {Camera, CameraOptions} from "@ionic-native/camera";
import { Storage } from '@ionic/storage';
import {HttpServiceProvider} from "../../../providers/http-service/http-service";
import {LoginPage} from "../login/login";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  crops = [
    {'id': 1, 'name': 'Paddy'},
    {'id': 2, 'name': 'Tomato'},
    {'id': 3, 'name': 'Chilly'},
  ];

  constructor(public navCtrl: NavController, private camera: Camera, private storage: Storage, private httpServiceProvider: HttpServiceProvider, private app: App) {

  }

  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
      let base64Image = 'data:image/jpeg;base64,' + imageData;
    }, (err) => {
      // Handle error
    });
  }

  logout() {
    this.storage.clear();
    this.httpServiceProvider.eraseTokenFromHeader();
    this.app.getRootNav().setRoot(LoginPage)
  }

}
