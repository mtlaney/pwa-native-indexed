
import { Component } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public items: any[] = [];
  public selected: any;
  checked = [];

  constructor(private router: Router,
    private alertCtrl: AlertController) {
  }

  ionViewWillEnter() {
    this.refresh();
  }

  refresh() {
    this.items = JSON.parse(localStorage.getItem("employee"));
    console.log(this.items);
  }

  edit(i) {
    let navigationExtra: NavigationExtras = {
      state: {
        index: i
      }
    }
    this.router.navigate(['./update'], navigationExtra);
  }

  async delete(index) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you really want to delete? It’s can’t revert once it delete.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
            this.items.splice(index, 1);
            console.log(this.items);
            localStorage.setItem("employee", JSON.stringify(this.items));
          }
        }
      ]
    });

    await alert.present();
  }

  async deleteAll() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Confirm!',
      message: 'Are you really want to delete? It’s can’t revert once it delete.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'OK',
          handler: () => {
            console.log('Confirm Okay');
            if (this.checked.length == 0) {
              localStorage.removeItem("employee");
              this.items = [];
            } else {
              this.removeData();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  addEmployee() {
    this.router.navigate(['./tabs/add-employee']);
  }

  //Removes checkbox from array when you uncheck it
  removeCheckedFromArray(checkbox: String) {
    return this.checked.findIndex((category) => {
      return category === checkbox;
    })
  }

  removeData() {
    for (var i = this.checked.length - 1; i >= 0; i--)
      this.items.splice(this.checked[i], 1);
    let index = this.removeCheckedFromArray(JSON.stringify(i));
    this.checked.splice(index, 1);
    console.log(this.items);
    localStorage.setItem("employee", JSON.stringify(this.items));
  }

  addStatic() {
    if (this.items == null) {
      localStorage.setItem("employee", JSON.stringify([{ "firstName": "test", "lastName": "test", "gender": "male", "email": "test@gmail.com", "password": "test@", "confirmPass": "test@", "address1": "test", "address2": "test", "area": "test", "pincode": "123456", "state": "test", "country": "test" }]))
      this.refresh();
    } else {
      this.items.push(
        {
          firstName: "test",
          lastName: "test",
          gender: "male",
          email: "test@gmail.com",
          password: "test@",
          confirmPass: "test@",
          address1: "test",
          address2: "test",
          area: "test",
          pincode: "123456",
          state: "test",
          country: "test"
        }
      );
      localStorage.setItem("employee", JSON.stringify(this.items));
    }
  }
}
