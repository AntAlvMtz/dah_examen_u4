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

  public getReservations(): Observable<Client []>{
    return this.firestore.collection('Reservation').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a =>{
          const data = a.payload.doc.data() as Client;
          const id = a.payload.doc.id;
          return { id, ...data };
        })
      })
    )
  }

}
