import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  private url = 'https://identitytoolkit.googleapis.com/v1/accounts';
  private apiKey = 'AIzaSyAkD99e-WJbH7bvvYnojEjTIttqT-wo5Q8';
  userToken: string;
  //crear nuevo usuario
  //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
  //login
  //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]
  constructor(private http: HttpClient) {
    this.leerToken();
   }
  logout() {
    localStorage.removeItem('token');
  }
  login(usuario: UsuarioModel) {
    const autData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };
    return this.http.post(
      `${this.url}/:signInWithPassword?key=${this.apiKey}`,
      autData).pipe(
        map(resp=>{
          console.log('Entro en el mapa del RXJS')
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );
  }
  nuevoUsuario(usuario: UsuarioModel) {
    const autData = {
      email: usuario.email,
      password: usuario.password,
      returnSecureToken: true
    };

    return this.http.post(
      `${this.url}/:signUp?key=${this.apiKey}`,
      autData).pipe(
        map(resp=>{
          console.log('Entro en el mapa del RXJS')
          this.guardarToken(resp['idToken']);
          return resp;
        })
      );
  }

  private guardarToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let hoy=new Date();
    hoy.setSeconds(3600); //podriamos obtener el dato del resp
    localStorage.setItem('expira',hoy.getTime().toString());
  }
  private leerToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token')
    }
    else {
      this.userToken = '';
    }
  }


  public estaAtutenticado():boolean{
    if(this.userToken.length<2)
      return false
    const expira=Number(localStorage.getItem('expira'));
    const expiraDate=new Date();
    expiraDate.setTime(expira);
    if(expiraDate>new Date()){
      return true
    }
    else
    {
      return false
    }
  }
}
