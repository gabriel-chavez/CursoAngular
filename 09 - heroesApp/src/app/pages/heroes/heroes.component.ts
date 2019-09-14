import  Swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { HeroesService } from 'src/app/services/heroes.service';
import { HeroeModel } from 'src/app/models/heroe-model';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes:HeroeModel[]=[];
  cargando=false;

  constructor(private heroesService: HeroesService) { }

  ngOnInit() {
    this.cargando=true;
    this.heroesService.obtenerHeroes()
      .subscribe(resp => {
        console.log(resp)
        this.cargando=false;
        this.heroes=resp;
      })
  }
  borrarHeroe(heroe:HeroeModel, i:number){
    Swal.fire({
      title:'Esta seguro?',
      text:`Esta seguro de eliminar a ${heroe.nombre}`,
      type:'question',
      showConfirmButton:true,
      showCancelButton:true,
    }).then(resp=>{
      if(resp.value){
        this.heroesService.borrarHeroe(heroe.id).subscribe(()=>{
          this.heroes.splice(i,1);
        });
      }
    })


  }

}
