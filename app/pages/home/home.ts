import { Component , NgZone, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Http,Headers } from '@angular/http';
import { Quest } from '../../models/quest';

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage{
  @ViewChild('chat') chat: any;

  message: string = "Registro de Misiones";
  quests: Quest[] = [];
  newQuest:Quest;

  audio:any;

  constructor( public toastCtrl: ToastController, private nav: NavController, private http: Http) {
    this.newQuest = new Quest({});
    console.log(this.quests);
    console.log(this.newQuest);
    this.audio =  {
      questActivate :  () => new Audio('./sounds/QuestActivateWhat1.wav'),
      questCompleted : () => new Audio('./sounds/QuestCompleted.wav'),
      questFailed : () => new Audio('./sounds/QuestFailed.wav'),
      questLog  : () =>new Audio('./sounds/QuestLog.wav'),
      questNew : () =>  new Audio('./sounds/QuestNew.wav') 
    };

  

    /*
     this.http.get('http://localhost:3600/expantions/all').subscribe(
     data=>{
     this.expansions = data.json();
     }
     );
     */

  }

  addMision(pQuest){
    let newQuest = new Quest({    
      title : pQuest.title,
      description : pQuest.description
    })

    this.audio.questNew().play();
    this.quests.push(newQuest);
    this.newQuest = new Quest({});
  }

  removeQuest(pQuest){

    this.audio.questFailed().play();
    this.quests.splice(this.quests.indexOf(pQuest),1)
    let toast = this.toastCtrl.create({
      message: 'La misión '+ pQuest.title+' ha sido eliminada.',
      duration : 5000
    });
    toast.present();
  }

  completedQuest(pQuest){
    this.audio.questCompleted().play();
     let toast = this.toastCtrl.create({
      message: 'La misión '+ pQuest.title+' ha sido completada! +200 exp',
      duration : 5000
    });
    toast.present();
  }
  goToDetails(pQuest) {

    this.audio.questActivate().play();
    //Mostramos un mensaje
    let toast = this.toastCtrl.create({
      message: 'Mision : ' + pQuest.title,
      duration: 3000
    });
    toast.present();
    //Nos vamos a un repositorio
    this.nav.push(DetailsPage, {
      mision: pQuest
    })

  }

}


