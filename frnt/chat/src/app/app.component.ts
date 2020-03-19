import { Component, OnInit } from '@angular/core';
import {SocketsService} from './sockets.service'
import { FormGroup, FormControl} from '@angular/forms'
import { Http } from '@angular/http';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Chat';
  date = new Date()
  name:any;
  usersInRoom= [];
  messagesChat = [];
  ownMesgs = []
  nickname = ''
  readonly uri: string= "https://uinames.com/api/?ext"

  constructor(public socketio:SocketsService,
              public http:Http
              ){}
              nicknameArr = new FormGroup({
                nick: new FormControl('')
              });
              arraymessages = new FormGroup({
                msgs: new FormControl(''),
                date: new FormControl(this.date)
              });
              recieveData = (newmsj)=>{
                  this.messagesChat = newmsj;
                  console.log(this.messagesChat);
              }
              onsubmitNickname(){
                const oldnick = this.nickname
                this.nickname =this.nicknameArr.value.nick
                const newnick = this.nickname
                 this.usersInRoom.forEach((el,i)=>{
                  if(el==oldnick){
                    this.usersInRoom[i] = this.nickname
                    this.socketio.emit('newnick', {newnick,i})
                    this.socketio.listen('updateNickname').subscribe((data:any)=>{
                      this.usersInRoom = data
                        this.onsubmit(newnick)
                    })
                  }
                })
              }
                onsubmit(a){
                    let author =''
                  if(a!==undefined){
                    let author= a
                  }else{
                    let author= this.name.json().name
                  }

                  let msg = this.arraymessages.value.msgs
                  let time = this.date
                  let newmsj = {msg, author, time}
                // this.arraymessages.value.date =`${this.date.getHours()}:${this.date.getMinutes()}:${this.date.getSeconds()}`
                  this.socketio.emit('messagefront',  {newmsj})
                  this.socketio.listen('messagesback').subscribe((data:any)=>{this.recieveData(data)})
                }
                ngOnInit(){
                  this.http.get(this.uri).subscribe(res =>{
                    this.name = res;
                    this.nickname = this.name.json().name
                    const thisNickname = this.nickname
                    this.socketio.emit('userinroom', thisNickname)})
                    this.socketio.listen('connection').subscribe((data:any)=>{
                      this.usersInRoom = data;})
                    this.socketio.listen('userinroomfr').subscribe((data:any)=>{
                      this.usersInRoom = data;}

                    )
                    this.socketio.listen('messagesback').subscribe((data:any)=>{this.recieveData(data)})
                  }
}
