import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor(private http: HttpClient) {
    console.log("spotify Listo")
  }
  getQuery(query: string) {
    const url: string = `https://api.spotify.com/v1/${query}`;
    const headers = new HttpHeaders({
      'Authorization': 'Bearer BQANxTJMIoF2diVW8NogfVed9mWmMaX0GCvYG-61d1L_QkvvFfkYor9G4NYMrMGewiGYVrtsYK0csMq_5cA'
    })
    return this.http.get(url,{headers});
  }
  getNewReleases() {

    return this.getQuery("browse/new-releases")
      .pipe(map(data => data['albums'].items
      ));
  }
  getArtistas(termino: string) {
    return this.getQuery(`search?q=${termino}&type=artist`)
      .pipe(map(data => data['artists'].items
      ));
    ;
  }
  getArtista(id: string) {
    return this.getQuery(`artists/${id}`);
    ;
  }
  getTopTracks(id: string) {
    return this.getQuery(`artists/${id}/top-tracks?country=us`)
      .pipe(map(data=>data['tracks']));
    ;
  }
}
