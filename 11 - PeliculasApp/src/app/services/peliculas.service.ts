import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {
  private apikey: string = "e617be73462e66c00df066938841b41a";
  private urlMoviedb: string = "https://api.themoviedb.org/3";

  peliculas: any[] = [];

  constructor(private http: HttpClient) { }
  getPopulares() {
    let url = `${this.urlMoviedb}/discover/movie?sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    //  return this.http.get(url)
    //    .pipe(map((res)=>res.json()))
    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(map((data: any) => data.results));

  }
  getPopularesNinos() {
    let url = `${this.urlMoviedb}/discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    //  return this.http.get(url)
    //    .pipe(map((res)=>res.json()))
    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(map((data: any) => data.results));

  }

  buscarPelicula(texto: string) {

    let url = `${this.urlMoviedb}/search/movie?query=${texto}&sort_by=popularity.desc&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;

    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(
      map((data: any) => {
        this.peliculas = data.results;
        console.log(this.peliculas)
        return data.results
      }));
  }
  getCartelera() {
    let desde = new Date();
    let hasta = new Date();
    hasta.setDate(hasta.getDate() + 7);
    let desdeStr = `${desde.getFullYear()}-${("0" + (desde.getMonth() + 1)).slice(-2)}-${("0" + desde.getDate()).slice(-2)}`;
    let hastaStr = `${hasta.getFullYear()}-${("0" + (hasta.getMonth() + 1)).slice(-2)}-${("0" + hasta.getDate()).slice(-2)}`;
    let url = `${this.urlMoviedb}/discover/movie?primary_release_date.gte=${desdeStr}&primary_release_date.lte=${hastaStr}&api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    console.log(url);
    return this.http.jsonp(url, 'JSONP_CALLBACK').pipe(map((data: any) => data.results));
  }
  obtenerPelicula(id:string) {
    let url = `${this.urlMoviedb}/movie/${id}?api_key=${this.apikey}&language=es&callback=JSONP_CALLBACK`;
    //  return this.http.get(url)
    //    .pipe(map((res)=>res.json()))
    return this.http.jsonp(url, 'JSONP_CALLBACK');
  }
}
