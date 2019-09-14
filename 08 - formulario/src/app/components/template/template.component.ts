import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    input.ng-invalid.ng-touched {
      border:1px solid #d9534f
    }
    input.ng-invalid.ng-touched.error {

    }
  `]
})
export class TemplateComponent {
  usuario: CUsuario =new CUsuario();
  paises=[{
    codigo:"CRI",
    nombre:"Costa Rica"
  },{
    codigo:"ESP",
    nombre:"ESPAÑA"
  },];
  sexos:string[]=["hombre","mujer","Sin definir"]
  constructor() { }


  guardar(forma: NgForm) {
    console.log("formulario posteado")
    console.log("ngFOrm", forma);
    console.log("valor forma", forma.value);
    console.log("Usuario", this.usuario);
  }
}

class CUsuario {
  nombre: String = null;
  apellido: String = null;
  correo: String = null;
  pais:String="";
  sexo:String="hombre";
  acepta:boolean=false
}
