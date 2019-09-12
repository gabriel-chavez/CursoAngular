import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel();
  recordarme=false;

  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }
  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    /***Alerta */
    Swal.fire({
      allowOutsideClick: false,
      type: 'info',
      text: 'Espere por favor...',
    })
    Swal.showLoading();
    /**** */

    console.log("formulario enviar");
    console.log(this.usuario)
    console.log(form)

    /*****/
    this.auth.nuevoUsuario(this.usuario).subscribe(resp => {
      Swal.close();
      console.log(resp);

      if(this.recordarme)
        localStorage.setItem('email',this.usuario.email);


      this.router.navigateByUrl('/home');
    }, (err) => {
      Swal.fire({
        allowOutsideClick: false,
        type: 'error',
        text: err.error.error.message,
        title: 'Error al Autenticar'
        ,
      })
      console.log(err.error.error.message)
    })
  }

}
