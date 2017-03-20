import { Component, ViewChild } from '@angular/core';
import { Nav, Platform  } from 'ionic-angular';
import { StatusBar } from 'ionic-native';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { Page3 } from '../pages/page3/page3';




@Component({
  templateUrl: 'app.html'
 
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  //public ppp: any = '../pages/home/home.html';

 public rootPage: any = Page1;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'หน้าแรก', component: Page1 },
      { title: 'ไทมไลน์ของเพื่อน', component: Page2 },
      { title: 'เพื่อนของฉัน', component: Page3 }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      
    });
  }

   chpage() {
    
    this.nav.setRoot(Page1);
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  chagePage(){

    //this.nav.push('../page1/page1.html');
    
    //this.navCtrl.push('../page1/page1.html');
  }


}
