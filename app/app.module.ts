import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';

import { NgModule, enableProdMode }         from '@angular/core';
import { BrowserModule, Title }    from '@angular/platform-browser';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { routing, appRoutingProviders } from './app.routing';

import { ObjToArrPipe }    from './pipes/objToArr.pipe';
import { ObjKeyToArrPipe } from './pipes/objKeyToArr.pipe';

import * as firebase from "firebase";
import {FIREBASE_PROVIDERS, 
        defaultFirebase, 
        AngularFire, 
        AuthMethods, 
        AuthProviders, 
        firebaseAuthConfig} from 'angularfire2';

import { NKDatetime } from 'ng2-datetime/ng2-datetime';
import { SELECT_DIRECTIVES } from 'ng2-select/ng2-select';
import { TagInputModule } from 'ng2-tag-input';

import { AppComponent }     from './app.component';
import { HeaderComponent }  from './header.component';
import { SidebarComponent } from './sidebar.component';

import { SessionsComponent } from './pages/sesiones.component';
import { SessionAddComponent } from './pages/sesion-nueva.component';
import { SessionEditComponent } from './pages/sesion-editar.component';
import { ParticipantsComponent } from './pages/participantes.component';
import { ParticipantEditComponent } from './pages/participante-editar.component';
import { ParticipantAddComponent } from './pages/participante-nuevo.component'

enableProdMode();


@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	ReactiveFormsModule,
  	TagInputModule,
  	routing
  ],
  declarations: [ 
  	AppComponent, 
  	HeaderComponent, 
  	SidebarComponent,
  	ObjToArrPipe,
  	ObjKeyToArrPipe,
  	NKDatetime,
  	SELECT_DIRECTIVES,
  	SessionsComponent,
  	SessionAddComponent,
  	SessionEditComponent,
  	ParticipantsComponent,
  	ParticipantEditComponent,
  	ParticipantAddComponent
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