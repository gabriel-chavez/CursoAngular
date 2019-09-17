import { ChatService } from './../../providers/chat.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {

  mensaje: string = "";
  elemento:any

  constructor(public _cs: ChatService) {

    this._cs.cargarMensajes()
        .subscribe(()=>{
          setTimeout (()=>{
            this.elemento.scrollTop=this.elemento.scrollHeight;
          },20)

        });

  }

  ngOnInit() {
    this.elemento=document.getElementById('app-mensajes');
  }
  enviar_mensaje() {
    console.log(this.mensaje)
    if(this.mensaje.length===0)
    return;
    this._cs.agregarMensaje(this.mensaje)
                .then(()=>{
                  this.mensaje="";
                  console.log('Mensaje enviado')
                })
                .catch((err)=>console.error('Error al enviar',err));

  }
}
