import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  constructor(public loadingController: LoadingController,
    public toastController: ToastController) { }

  async load() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000
    });
    await loading.present();
  }

  dismiss() {
    this.loadingController.dismiss();
  }

  async presentToast(msg: string, dur: number, clr: string) {
    const toast = await this.toastController.create({
      message: msg,
      duration: dur,
      color: clr
    });
    toast.present();
  }

}
