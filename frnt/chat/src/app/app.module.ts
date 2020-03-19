import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {SocketsService} from './sockets.service';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule

  ],
  providers: [SocketsService,FormsModule,HttpModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
