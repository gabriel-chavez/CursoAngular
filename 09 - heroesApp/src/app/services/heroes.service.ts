import { HeroeModel } from './../models/heroe-model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map,delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private url = "https://login-app-8fa3d.firebaseio.com";
  constructor(private http: HttpClient) { }

  crearHeroe(heroe: HeroeModel) {
    return this.http.post(`${this.url}/heroes.json`, heroe)
      .pipe(
        map((resp: any) => {
          heroe.id = resp.name;
          alert("Se guardo correctamente");
          return heroe;
        })
      );
  }
  actualizarHeroe(heroe: HeroeModel) {
    const heroeTemp = {
      ...heroe
    }
    delete heroeTemp.id; //para evitar guardar el id
    return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemp)
      .pipe(
        map((resp: any) => {

          alert("Se actualizo correctamente");
          return heroe;
        })
      );
  }
  obtenerHeroes(){
    return this.http.get(`${this.url}/heroes.json`)
      .pipe(
        map(resp=>this.crearArreglo(resp),delay(3000))
      );
      //tambien se puede hace de la siguiente manera para resumir
      //map(this.crearArreglo)mandara a la funcion crearArreglo el primer argumento de que envie el operador map
  }
  private crearArreglo(heroesObj:object){
    const heroes:HeroeModel[]=[];
    console.log(heroesObj);
    if(heroesObj===null)
    return heroes;

    Object.keys(heroesObj).forEach(key=>{
      const heroe:HeroeModel=heroesObj[key];
      heroe.id=key;
      heroes.push(heroe);
    })
    return heroes;
  }
  obtenerHeroe(id:string){
    return this.http.get(`${this.url}/heroes/${id}.json`);
  }
  borrarHeroe(id:string){
    return this.http.delete(`${this.url}/heroes/${id}.json`);
  }
}
