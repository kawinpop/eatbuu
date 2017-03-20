import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { Page1 } from '../page1/page1';
/*
  Generated class for the LogIn page.
  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html'
})
export class LogInPage {

  FB_APP_ID: number = 1264456900309664;
  

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");

    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogInPage');
  }

  doFbLogin(){
    let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(Page1);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });

    

  }

}