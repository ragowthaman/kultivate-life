import {Component} from '@angular/core';
import {NavController, ActionSheetController, Platform, ToastController, LoadingController} from 'ionic-angular';
import { CameraServiceProvider } from '../../../providers/camera-service/camera-service';


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
  picture_array: any[] = [];
  dummy = 'assets/imgs/logo.png';

  constructor(public navCtrl: NavController, private cameraProvider: CameraServiceProvider, private actionsheetCtrl: ActionSheetController, private platform: Platform,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController) {
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

}
