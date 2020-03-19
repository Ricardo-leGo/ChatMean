import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable(
// {  providedIn:'root'}
)
export class SocketsService {
  socket:any;
  readonly uri: string= "http://localhost:3000/"
  constructor() {
    this.socket= io(this.uri)
   }
  listen(EventName:string){
    return new Observable((subscriber)=>{
      this.socket.on(EventName, (data)=>{
        subscriber.next(data)
      })
    })
  }
emit(eventName:string, data:any){
    this.socket.emit(eventName,data)
  }

}
