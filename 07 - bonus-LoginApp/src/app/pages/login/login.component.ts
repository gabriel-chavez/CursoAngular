
import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { AuthService } from './../../services/auth.service';
import { UsuarioModel } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:UsuarioModel=new UsuarioModel();
  recordarme=false;


  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit() {
    if(localStorage.getItem('email')){
      this.usuario.email=localStorage.getItem('email');
      this.recordarme=true;
    }
  }
  login(form:NgForm){
    if(form.invalid){
      return;
    }
    /**Alerta */
    Swal.fire({
      allowOutsideClick:false,
      type:'info',
      text:'Espere por favor...',
    })
    Swal.showLoading();
    /*****/
    console.log(this.usuario);
    console.log("valido");
    /****** */
    this.auth.login(this.usuario).subscribe(resp=>{
      console.log(resp);
      Swal.close();

      if(this.recordarme)
        localStorage.setItem('email',this.usuario.email);


      this.router.navigateByUrl('/home');
    },(err)=>{
      Swal.fire({
        allowOutsideClick:false,
        type:'error',
        text:err.error.error.message,
        title:'Error al Autenticar'
        ,
      })
      console.log(err.error.error.message);

    });

  }

}
