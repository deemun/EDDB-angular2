import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, RequestOptions } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';


export const firebaseConfig = {
  apiKey: 'AIzaSyDM9QE4CNzHRkLDNFS2Z3QsXrNP8IO5pKE',
  authDomain: 'eddb-37c12.firebaseapp.com',
  databaseURL: 'https://eddb-37c12.firebaseio.com',
  storageBucket: 'eddb-37c12.appspot.com',
  messagingSenderId: '420466749498'
};


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
