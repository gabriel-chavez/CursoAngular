
import { Component } from '@angular/core';
import { ChatService } from './providers/chat.service';
import { AngularFirestore } from '@angular/fire/firestore';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  //public chats: Observable<any[]>;
  constructor(public _cs: ChatService) {

  }
}
