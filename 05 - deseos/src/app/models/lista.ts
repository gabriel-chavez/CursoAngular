import { ListaItem } from './lista-item';

export class Lista {
    id:Number;
    titulo:string;
    creadaEn:Date;
    terminadaEn:Date;
    terminada:boolean;
    items:ListaItem[];
    constructor(titulo:string,){
        this.titulo=titulo;
        this.creadaEn=new Date();
        this.terminada=false;
        this.items=[];
        this.id=new Date().getTime();
    }
}
