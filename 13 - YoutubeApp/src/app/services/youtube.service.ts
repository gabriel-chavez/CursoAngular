import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = "https://www.googleapis.com/youtube/v3";
  private apiKey: string = "AIzaSyA3STs8VcSo1X--rhKLECxuZQQ5pNtGSDU";
  private playList: string = "UUKBzTmM4xXBp4YjyVuNGa2w";

  private nextPageToken: string = "";

  constructor(public http: HttpClient) { }


  getVideos() {

    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new HttpParams();
    params=params.set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.apiKey);

    if(this.nextPageToken){
      params=params.set('pageToken',this.nextPageToken);
      console.log(params)
    }
    return this.http.get(url, { params: params })
      .pipe(map((res: any) => {
        this.nextPageToken = res.nextPageToken;
        let videos: any[] = [];
        for (let video of res.items) {
          let sniped=video.snippet;
          videos.push(sniped);
        }
        return videos;
      }));
  }
}
