import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

import {AboutPage} from '../pages/farmer/about/about';
import {ContactPage} from '../pages/farmer/contact/contact';
import {HomePage} from '../pages/farmer/home/home';
import {TabsPage} from '../pages/farmer/tabs/tabs';

import {HttpModule} from '@angular/http';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Camera} from "@ionic-native/camera";
import {HttpServiceProvider} from '../providers/http-service/http-service';
import {GlobalProvider} from '../providers/global/global';
import {IonicStorageModule} from '@ionic/storage';
import {LoginPage} from "../pages/farmer/login/login";
import {SignUpPage} from "../pages/farmer/sign-up/sign-up";
import { CameraServiceProvider } from '../providers/camera-service/camera-service';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      platforms: {
        android: {
          scrollAssist: false,
          autoFocusAssist: false
        }
      }
    }),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    SignUpPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    Camera,
    HttpServiceProvider,
    GlobalProvider,
    CameraServiceProvider,
  ]
})
export class AppModule {
}
