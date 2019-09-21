import { CargaImagenesService } from './../../services/carga-imagenes.service';
import { FileItem } from './../../models/file-item';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {

  estaSobreElemento:boolean=false;
  archivos:FileItem[]=[];

  constructor(public _cargaImagenes:CargaImagenesService) { }

  ngOnInit() {
  }
  cargarImagenes(){
    this._cargaImagenes.cargarImagenesFirebase(this.archivos);
  }
  pruebaSobreElemento(evento){
    console.log(evento)
  }
  limpiarArchivos(){
    this.archivos=[];
  }
}
