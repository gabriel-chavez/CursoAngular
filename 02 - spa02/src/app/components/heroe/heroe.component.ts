import { Component, OnInit } from '@angular/core';
import { Heroe,HeroesService } from 'src/app/servicios/heroes.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html'

})
export class HeroeComponent  {
  heroe:Heroe;
  constructor( private activateRoute:ActivatedRoute,
               private _heroeService:HeroesService)
  {
    this.activateRoute.params.subscribe(params=>{
      this.heroe=this._heroeService.getHeroe(params['id']);
      console.log(this.heroe);
    })

  }



}
