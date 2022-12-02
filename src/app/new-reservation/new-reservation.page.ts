import { Component, OnInit } from '@angular/core';
import { ClientService } from '../services/client.service';
import { Client } from '../models/client';
import { Reservation } from '../models/reservation';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.page.html',
  styleUrls: ['./new-reservation.page.scss'],
})
export class NewReservationPage implements OnInit {

  public myForm: FormGroup;
  public client: Client;
  public name: string;
  public tel: string;
  public validatorMessages: Object;
  public today: any;
  public total: any;
  public reservation: Reservation;

  constructor(private clientService:ClientService, private fb:FormBuilder, private toastController: ToastController, private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      this.clientService.getClientByTel(params.tel).subscribe(item=>{
        this.client = item as Client;
        this.name = this.client.name;
        this.tel = this.client.tel;
      });
    });
    this.getDate();
    this.myForm = this.fb.group({
      dateReservation:["",Validators.required],
      pool:0,
      brincolin:false,
      futbolito:false,
      mesaPostres:false,
      total:0
    });

    this.validatorMessages = {
      dateReservation: [
        { type: 'required', message: "Fecha de reservación obligatoria" }
      ]
    }

    this.myForm.get('dateReservation').valueChanges.subscribe(selectedValue =>{
      this.total = 1000;
    });
    
    this.myForm.get('pool').valueChanges.subscribe(selectedValue =>{
      console.log(selectedValue);
      switch(selectedValue){
        case 1: this.total = this.total + 100; break;
        case 2: this.total = this.total + 100; break;
        case 3: this.total = this.total + 100; break;
        case 4: this.total = this.total + 100; break;
        case 5: this.total = this.total + 100; break;
        case 6: this.total = this.total + 100; break;
      }
    });

    this.myForm.get('brincolin').valueChanges.subscribe(selectedValue => {
      if(selectedValue){
        this.total = this.total+200;
      }else{
        this.total = this.total-200;
      }
    });

    this.myForm.get('futbolito').valueChanges.subscribe(selectedValue => {
      if(selectedValue){
        this.total = this.total+100;
      }else{
        this.total = this.total-100;
      }
    });

    this.myForm.get('mesaPostres').valueChanges.subscribe(selectedValue => {
      if(selectedValue){
        this.total = this.total+150;
      }else{
        this.total = this.total-150;
      }
    });
    
  }

  getDate() { const date = new Date(); this.today = date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + (date.getDate() + 1)).slice(-2); console.log(this.today); }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Reservación realizada',
      duration: 1500,
      position: 'bottom'
    });
    await toast.present();
  }

  public newReservation(){
    this.reservation = {
      nameClient: this.name,
      telClient: this.tel,
      date: this.myForm.controls.dateReservation.value,
      pool: this.myForm.controls.pool.value,
      mesaPostres: this.myForm.controls.mesaPostres.value,
      brincolin: this.myForm.controls.brincolin.value,
      futbolito: this.myForm.controls.futbolito.value,
      total: this.total
    }
    this.clientService.newReservation(this.reservation)
    this.presentToast();
  }

}
