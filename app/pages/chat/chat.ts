import { Component , NgZone, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { Http,Headers } from '@angular/http';
import { ChatService } from '../../services/chat';

@Component({
  templateUrl: 'build/pages/chat/chat.html',
  providers:[ChatService]
})
export class ChatPage {
  @ViewChild('chat') chat: any;

  expansions: any;
  username: string = 'Anónimo';
  messages: any;
  socketHost: string;
  zone: NgZone;
  chatBox: string;

  constructor(public navCtrl: NavController, public toastCtrl: ToastController, private nav: NavController, private http: Http,
              private chatService: ChatService) {

    this.messages = [];
    this.socketHost = "http://localhost:3330";
    this.zone = new NgZone({enableLongStackTrace: false});

    this.chatBox = "";
    this.chatService.socketService.subscribe(event => {
      console.log('message received from server... ', event);
      if (event.category === 'message') {
        this.zone.run(() => {
          this.messages.push(event.message);
          this.chat.scrollTo(0, 99999, 0);
        });
      }
    }); //end of subscribe

  }

  joinRoom() {
    let data = {
      username: this.username
    }

    this.chatService.joinRoom(data);
    this.nav.push(ChatPage);
  }

  send(message: any) {
    // let newMsg = this.formatMessage(msg);
    this.chatService.sendMessage(message);
    this.messages.push(message);
    console.log('emitting: ', message);
    this.chatBox = '';
  }

}

