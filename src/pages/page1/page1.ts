import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { ModalController } from 'ionic-angular';
import { LogInPage } from '../log-in/log-in';
import { MyApp } from '../../app/app.component';
import { Http } from '@angular/http';

@Component({
  selector: 'page-page1',
  templateUrl: 'page1.html'
})
export class Page1 {

  private accessToken = 'EAARZBBFBgcqABADZA4C2UhEov8A7QbtTp9jqm1lYCDSRQtINmLxhAZBZBb5sUWpeEnsVmuJSuYZAnNe39KGI5EBZC2IiFGtU139Rs6gTNE3ziSMmYUt0YskHytJFbkW3etFXrnpcKZAdXknXughFaLiVCEZCTPZAwZBIgZD';
  private graphUrl = 'https://graph.facebook.com/me/feed';
  private graphQuery = `?access_token=${this.accessToken}&date_format=U&fields=posts{from,created_time,message,attachments}`;

  public user: any;
  public userReady: boolean = false;

  public statusLogin:any = 0;
  public  ma  = MyApp;

  constructor(public navCtrl: NavController,public modalCtrl: ModalController ,public http: Http) {
    
    // if(!this.userReady){
    //   this.login();
    // }


  }

  login(){
    
    this.navCtrl.push(LogInPage);
 }

  loginReady(){
    this.navCtrl.push(this);
 }

 ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        gender: data.gender,
        picture: data.picture
      };
        env.userReady = true;
        
        env.loginReady();
    }, function(error){
      console.log(error);
      env.login();
    });
  }

  doFbLogout(){
   // let nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      //nav.push(LoginPage);
      this.login();
    }, function(error){
      console.log(error);
    });
  }

  share(message){
      let url = this.graphUrl  + this.graphQuery;

    this.http.post(url,{message:message})
    .subscribe(data =>{
      console.log(data);
      var resp = data.text().trim();
      if(resp = "success"){
        console.log(resp);
        //this.loadDB();
      } else {
        console.log("Delete Faile");
      }
      
    }, err=>{
      console.log(err);
    })
  }

}