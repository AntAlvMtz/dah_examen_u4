import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewReservationPageRoutingModule } from './new-reservation-routing.module';

import { NewReservationPage } from './new-reservation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    NewReservationPageRoutingModule
  ],
  declarations: [NewReservationPage]
})
export class NewReservationPageModule {}
