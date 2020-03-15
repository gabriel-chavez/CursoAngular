import { MapaEditarComponent } from './mapa-editar.component';
import { Marcador } from './../../classes/marcador.class';
import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {
  lat = 51.678418;
  lng = 7.809007;
  marcadores: Marcador[] = [];
  constructor(public snackBar:MatSnackBar,
              public dialog: MatDialog) {
    if (localStorage.getItem('marcadores')) {
      this.marcadores=JSON.parse(localStorage.getItem('marcadores'));
    }
  }

  ngOnInit() {
  }
  agregarMarcador(evento) {
    const coords: { lat: number, lng: number } = evento.coords;
    const nuevoMarcador = new Marcador(coords.lat, coords.lng);
    this.marcadores.push(nuevoMarcador);
    this.guardarStorage();
    this.snackBar.open('Marcador agregado','Cerrar',{duration:3000});
  }
  guardarStorage() {
    localStorage.setItem('marcadores', JSON.stringify(this.marcadores));
  }
  borrarMarcador(index:number){
    console.log(index)
    this.marcadores.splice(index,1);
    this.guardarStorage();
    this.snackBar.open('Marcador eliminado','Cerrar',{duration:3000});
  }
  editarMarcador(marcador:Marcador){
    const dialogRef = this.dialog.open(MapaEditarComponent, {
      width: '250px',
      data: {titulo: marcador.titulo, desc: marcador.desc}
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if(!result)
      return;
      marcador.titulo=result.titulo;
      marcador.desc=result.desc;
      this.guardarStorage();
      this.snackBar.open('Marcador actualizado','Cerrar',{duration:3000});
    });

  }
}