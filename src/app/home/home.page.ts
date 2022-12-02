import { Component } from '@angular/core';
import { Client } from '../models/client';
import { Reservation } from '../models/reservation';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  public reservations: Reservation[];

  constructor(private clientService:ClientService) {

    this.clientService.getReservations().subscribe(res =>{
      this.reservations = res;
      console.log(this.reservations);
    })

  }



}
