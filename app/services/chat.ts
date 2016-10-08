import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as io from 'socket.io-client';

@Injectable()
export class ChatService {

  PORT = 3330;

  socketObserver: any;
  socketService: any;
  socket: any;
  user: any;
  data: any = null;
  socketHost: string = 'http://localhost:'+this.PORT;

  constructor() {
    this.socketService = Observable.create(observer => {
      this.socketObserver = observer;
    });
  }


  initialize(){

    this.socket = io.connect(this.socketHost);

    console.log("SOCKET LOG -> ", this.socket);
    this.socket.emit('newUser',{username:"test"});

    this.socket.on("connect", (msg) => {
      console.log('on connect');
      this.socketObserver.next({ category: 'connect', message: 'user connected'});
    });

    this.socket.on('testres',function () {
        console.log("Test Emit Response");
    });

    this.socket.on("reconnecting", (msg) => {
      console.log('on reconnecting');
    });

    this.socket.on("reconnect_error", (msg) => {
      console.log('on reconnect_error');
    });

    this.socket.on("reconnect_failed", (msg) => {
      console.log('on reconnect_failed');
    });

    this.socket.on('disconnect', function () {
      console.log('user disconnected');
      // io.emit('user disconnected');
    });

    this.socket.on("message", (msg) => {
      this.socketObserver.next({ category: 'message', message: msg });
    }); //end of socket.on('message')

    this.socket.on('new message',function(data){
      console.log(data);
    })

  }

  joinRoom(data){
    console.log("[LOG] Join user", data);
    //io.emit('newUser',data)
  }


  sendMessage(message: any) {
    console.log('in sendMessage and socket is: ', this.socket,this.socketService);
    this.socket.emit('message', message);
    this.socketObserver.next({ category: 'sendMessage', message: message });

  }
}

