import { FotosComponent } from './components/fotos/fotos.component';
import { Routes, RouterModule } from '@angular/router';
import { CargaComponent } from './components/carga/carga.component';
import { NgModule } from '@angular/core';


const routes: Routes = [
  {path:'fotos', component:FotosComponent},
  {path:'carga', component:CargaComponent},
  {path:'**', pathMatch:'full',redirectTo:'fotos'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
