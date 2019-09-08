import { Component, OnInit } from '@angular/core';
import { HeroesService, Heroe } from 'src/app/servicios/heroes.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',

})
export class BuscarComponent implements OnInit {
  heroes:Heroe[];
  termino:string;
  constructor(private _heroesService:HeroesService,
    private router:Router,
    private activateRoute:ActivatedRoute) { }

  ngOnInit() {

    this.activateRoute.params.subscribe(params=>{
      this.heroes=this._heroesService.buscarHeroes(params['termino']);
      this.termino=params['termino'];
    })

  }
  verHeroe(idx:number){
    this.router.navigate(['/heroe',idx])

  }

}
