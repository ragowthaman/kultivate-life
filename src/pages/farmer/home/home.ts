import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from "../../../providers/http-service/http-service";
import { LoginPage } from "../login/login";
import { NavController, App, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { CameraServiceProvider } from '../../../providers/camera-service/camera-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // crops = [
  //   { 'id': 1, 'name': 'Paddy' },
  //   { 'id': 2, 'name': 'Tomato' },
  //   { 'id': 3, 'name': 'Chilly' },
  // ];
  crop_id: any;
  age_of_crop: any;
  notes: any;
  crops: any[] = [];
  picture_array: any[] = [];

  constructor(public navCtrl: NavController, private cameraProvider: CameraServiceProvider, private actionsheetCtrl: ActionSheetController, private platform: Platform,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController, private storage: Storage, private httpServiceProvider: HttpServiceProvider, private app: App) {
    this.httpServiceProvider.getCrops().subscribe((data) => {
      console.log(data);
      this.crops = data;
    }, (error) => {
      console.log(error);
    });
  }

  choosePicture() {
    console.log(this.picture_array);
    // this.picture_array.push(null);
    // let pic_index = (this.picture_array.length);
    let actionsheet = this.actionsheetCtrl.create({
      title: 'upload picture',
      buttons: [
        {
          text: 'camera',
          icon: !this.platform.is('ios') ? 'camera' : null,
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: !this.platform.is('ios') ? 'gallery' : 'camera roll',
          icon: !this.platform.is('ios') ? 'image' : null,
          handler: () => {
            this.getPicture();
          }
        },
        {
          text: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'destructive',
          handler: () => {
            console.log('the user has cancelled the interaction.');
          }
        }
      ]
    });
    return actionsheet.present();
  }

  takePicture() {
    let loading = this.loadingCtrl.create();

    loading.present();

    return this.cameraProvider.getPictureFromCamera().then(picture => {
      if (picture) {
        this.picture_array.push(picture);
        this.displatToast('Image Taken!');
      }
      loading.dismiss();
    }, error => {
      loading.dismiss();
      alert(error);
    });
  }

  logout() {
    this.storage.clear();
    this.httpServiceProvider.eraseTokenFromHeader();
    this.app.getRootNav().setRoot(LoginPage)
  }


  getPicture() {
    let loading = this.loadingCtrl.create();

    loading.present();

    return this.cameraProvider.getPictureFromPhotoLibrary().then(picture => {
      if (picture) {
        this.picture_array.push(picture);
        this.displatToast('Image Taken!');
      }
      loading.dismiss();
    }, error => {
      alert(error);
      loading.dismiss();
    });
  }

  displatToast(message) {
    let toast = this.toastCtrl.create({
      message: message,
      position: 'top',
      duration: 3000
    });
    toast.present();
  }

  removeSelectedPic(index) {
    this.picture_array.splice(index, 1);
  }

  uploadQuery(crop_id, age_of_crop, notes, picture_array) {
    let query_dict = {};
    query_dict['user_id'] = 3;
    query_dict['crop_id'] = crop_id;
    query_dict['age_of_crop'] = age_of_crop;
    query_dict['notes'] = notes;
    if (picture_array.length != 0) {
      query_dict['query_picture'] = picture_array;
    }
    console.log(query_dict);
    this.httpServiceProvider.uploadUserQuery(query_dict).subscribe((data) => {
      console.log(data);
      this.crop_id = null;
      this.age_of_crop = null;
      this.notes = null;
      this.picture_array = []
      alert('Your Request is uploaded!');
    }, (error) => {
      console.log(error);
    });
  }

}
