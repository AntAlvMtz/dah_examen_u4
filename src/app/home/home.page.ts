import { Component } from '@angular/core';
import { Client } from '../models/client';
import { ClientService } from '../services/client.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {


  //public client: Client[];

  constructor(private clientService:ClientService) {

    this.clientService.getReservations().subscribe(res =>{
     // this.client = res;
      //console.log(this.client);
    })

  }



}
