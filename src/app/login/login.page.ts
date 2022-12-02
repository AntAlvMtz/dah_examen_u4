import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { FormGroup, FormBuilder} from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public tel:String;
  public myForm:FormGroup;

  constructor(private fb:FormBuilder, private toastController: ToastController, private router:Router, private clientService:ClientService) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      tel: ""
    });
  }

  public login(data):void{
    console.log(data);
    this.tel = data.tel;
    if(this.tel == "admin12345"){
      this.presentToast('bottom','Acceso Correcto');
      this.router.navigate(['/home']);
    }else if (this.clientService.clientLogin(this.myForm.get('tel').value)) {
      this.presentToast('bottom','Ingreso correcto');
      this.getClientdByTel(this.myForm.get('tel').value);
    }else{
      this.presentToast('bottom','Acceso Incorrecto');
    }
  }

  public getClientdByTel(tel: string): void{
    this.router.navigate(['/new-reservation'],{
      queryParams: {tel: tel}
    });
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', msj:string) {
    const toast = await this.toastController.create({
      message: msj,
      duration: 1000,
      position: position
    });

    await toast.present();
  }
}
