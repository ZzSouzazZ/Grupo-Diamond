import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastServiceService {

  constructor( private toastCtrl: ToastController ) { }

  async mostrarToast(mensagem:string,duracao:number,postion:any){

    let toast = this.toastCtrl.create({

      message: mensagem,
      duration: duracao,
      position: postion

    })

    ;(await toast).present();

  }



}
