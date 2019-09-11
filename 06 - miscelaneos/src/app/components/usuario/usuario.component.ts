import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html'
})
export class UsuarioComponent implements OnInit {

  constructor(private route:ActivatedRoute) {
    this.route.params.subscribe(parametros=>{
      console.log("ruta Padre");
      console.log(parametros);
    })
  }

  ngOnInit() {
  }

}
