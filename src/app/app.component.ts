import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

import { HomePage } from '../pages/home/home';
import { AuthService } from '../services/auth';
import { OrderPage } from '../pages/order/order';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  loginPage = LoginPage;
  signupPage = SignupPage;
  isAuthenticated = false;

  @ViewChild('nav') nav: NavController;

  constructor(
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    private authService: AuthService,
    private menuCtrl: MenuController) {
      firebase.initializeApp({
        apiKey: "AIzaSyDXxZuqFkiOh1ovZknE8NIb13oz1ZYR8j4",
        authDomain: "p7-dougherty.firebaseapp.com"
      });
      firebase.auth().onAuthStateChanged(user => {
        if(user) {
          this.isAuthenticated = true;
          this.rootPage = OrderPage;
        }
        else {
        this.isAuthenticated = false;
        this.rootPage = HomePage;
        }
    });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  onLoad(page: any) {
    this.nav.setRoot(page);
    this.menuCtrl.close();
  }

  onLogout() {
    this.authService.logout();
    this.menuCtrl.close();
    this.nav.setRoot(HomePage);
  }
}

