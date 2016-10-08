import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

/*
  Generated class for the DetailsPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/details/details.html',
})
export class DetailsPage {
	private mision :any;

	constructor(private navCtrl: NavController,private navParas : NavParams) {
		this.mision = navParas.get('mision');
	}


}
