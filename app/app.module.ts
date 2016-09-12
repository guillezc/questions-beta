import { NgModule }         from '@angular/core';
import { BrowserModule }    from '@angular/platform-browser';
import { NgForm, FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';
import { Title } from '@angular/platform-browser';

import * as firebase from "firebase";
import {FIREBASE_PROVIDERS, 
        defaultFirebase, 
        AngularFire, 
        AuthMethods, 
        AuthProviders, 
        firebaseAuthConfig} from 'angularfire2';

import { AppComponent }     from './app.component';
import { HeaderComponent }  from './header.component';
import { SidebarComponent } from './sidebar.component';

import { ParticipantsComponent } from './pages/participantes.component';
import { ParticipantEditComponent } from './pages/participante-editar.component'

@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	routing
  ],
  declarations: [ 
  	AppComponent, 
  	HeaderComponent, 
  	SidebarComponent,
  	ParticipantsComponent,
  	ParticipantEditComponent
	],
	providers: [
    appRoutingProviders,
    FIREBASE_PROVIDERS,
    defaultFirebase({
	    /*apiKey: "AIzaSyCTfrqErjXXuOPAPWK4AOJBLu3tg2-dJx8",
	    authDomain: "events-7d50b.firebaseapp.com",
	    databaseURL: "https://events-7d50b.firebaseio.com",
	    storageBucket: "events-7d50b.appspot.com"*/
	    apiKey: "AIzaSyB5ZUgBJabSy-F18lNUiyqmb0xy72oFCx4",
	    authDomain: "questions-16537.firebaseapp.com",
	    databaseURL: "https://questions-16537.firebaseio.com",
	    storageBucket: "questions-16537.appspot.com",
	  }),
	  firebaseAuthConfig({
	    provider: AuthProviders.Anonymous,
	    method: AuthMethods.Anonymous
	  }),
	  Title
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule { }