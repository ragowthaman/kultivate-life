import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpServiceProvider } from "../../../providers/http-service/http-service";
import { LoginPage } from "../login/login";
import { NavController, App, ActionSheetController, Platform, ToastController, LoadingController } from 'ionic-angular';
import { CameraServiceProvider } from '../../../providers/camera-service/camera-service';
import { TranslateService } from '@ngx-translate/core';
import {GlobalProvider} from "../../../providers/global/global";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  crop_id: number = 1;
  age_of_crop: number = null;
  notes: any = '';
  crops: any[] = [];
  picture_array: any[] = [];
  default_lang: any = 'தமிழ்';
  crop_units: any = [];
  crop_unit_id: number = 1;

  constructor(public navCtrl: NavController, private cameraProvider: CameraServiceProvider, private actionsheetCtrl: ActionSheetController, private platform: Platform,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController, private storage: Storage, private httpServiceProvider: HttpServiceProvider,
              private app: App, public translate: TranslateService, private global: GlobalProvider) {

    this.storage.get('language').then((lang) => {
      console.log(lang);
      if (lang != null) {
        this.default_lang = lang;
      }
      this.translate.addLangs(['english', 'தமிழ்']);
      this.translate.setDefaultLang('english');
      const browserLang = this.translate.getBrowserLang();
      this.translate.use(browserLang.match(/english|தமிழ்/) ? browserLang : this.default_lang);
    });

    this.httpServiceProvider.getAppVersion().subscribe((data) => {
      console.log(data);
      if (this.global.version != data['version']) {
        alert('Please update the app from playstore');
          // window.open("https://play.google.com/store/apps/details?id=com.kultivate.kultivate_life", "_system");
      } else {
        console.log('App is up to date');
      }
    });

  }

  ionViewDidEnter() {
    this.httpServiceProvider.getCrops().subscribe((data) => {
      console.log(data);
      this.crops = data;
    }, (error) => {
      console.log(error);
    });

    this.httpServiceProvider.getCropAgeUnits().subscribe((data) => {
      console.log(data);
      this.crop_units = data;
    }, (error) => {
      console.log(error);
    });
  }

  choosePicture() {
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

  uploadQuery(crop_id, age_of_crop, notes, picture_array, crop_unit_id) {
    console.log(crop_unit_id);
    if (crop_unit_id == undefined || crop_unit_id == '' || crop_unit_id == null) {
      alert('Please selet crop age unit');
      return false;
    }
    let query_dict = {};
    query_dict['crop_id'] = crop_id;
    query_dict['age_of_crop'] = age_of_crop;
    query_dict['notes'] = notes;
    query_dict['crop_unit_id'] = crop_unit_id;

    console.log(query_dict);

    if (picture_array.length < 1) {

      this.translate.get('Please select at lease one Image!').subscribe((value) => {
        alert(value);
      });
      return false;
    } else {
      query_dict['query_picture'] = picture_array;
    }

    if (crop_id == undefined || crop_id == null) {
      this.translate.get('Please Select A Crop!').subscribe((value) => {
        alert(value);
      });
      return false;
    }

    if (age_of_crop == undefined || age_of_crop == null) {
      this.translate.get('Please Enter the Age of the Crop!').subscribe((value) => {
        alert(value);
      });
      return false;
    }

    this.httpServiceProvider.uploadUserQuery(query_dict).subscribe((data) => {
      console.log(data);
      this.crop_id = null;
      this.age_of_crop = null;
      this.notes = '';
      this.picture_array = [];
      this.translate.get('Your Request is uploaded!').subscribe((value) => {
        alert(value);
      });
      // alert('Your Request is uploaded!');
    }, (error) => {
      console.log(error);
    });
  }

  setDefaultLanguage(language) {
    console.log(language);
    this.storage.set('language', language);
  }

}
