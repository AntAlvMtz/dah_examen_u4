import { Injectable } from '@angular/core';
import { Client } from '../models/client';
import { Reservation } from '../models/reservation';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {



  constructor(private firestore: AngularFirestore) { 

  }


  public newReservation(reservation:Reservation){  
    this.firestore.collection('Reservation').add(reservation);
  } 

  public newClient(client:Client){
    this.firestore.collection('Client').add(client);
  }

  public getReservations(): Observable<Reservation []>{
    return this.firestore.collection('Reservation').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Reservation;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

  public clientLogin(tel:string): any{
    let result = this.firestore.collection('Client').doc(tel).valueChanges();
    return result;
  }

  public getClientByTel(tel:string){
    let result = this.firestore.collection('Client').doc(tel).valueChanges();
    return result;
  }
}
