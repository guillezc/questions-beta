import '@angular/platform-browser-dynamic';
import '@angular/platform-browser';
import '@angular/core';

import { NgModule, enableProdMode }         				from '@angular/core';
import { BrowserModule, Title }    									from '@angular/platform-browser';
import { NgForm, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { platformBrowserDynamic } 									from '@angular/platform-browser-dynamic';

import { Routes, RouterModule } 								from '@angular/router';
import { routing, routes, appRoutingProviders } from './app.routing';

import { ObjToArrPipe }    from './pipes/objToArr.pipe';
import { ObjKeyToArrPipe } from './pipes/objKeyToArr.pipe';

import * as firebase from "firebase";

import {FIREBASE_PROVIDERS, 
        defaultFirebase, 
        AngularFire, 
        AuthMethods, 
        AuthProviders, 
        firebaseAuthConfig} from 'angularfire2';

import { NKDatetime } 			 from 'ng2-datetime/ng2-datetime';
import { SELECT_DIRECTIVES } from 'ng2-select/ng2-select';
import { TagInputModule } 	 from 'ng2-tag-input';
import { ChartsModule } 		 from 'ng2-charts/ng2-charts';

import { AppComponent }      from './app.component';
import { HeaderComponent }   from './header.component';
import { SidebarComponent }  from './sidebar.component';
import { PieChartComponent } from './parts/pieChart.component';

import { SessionsComponent } 							from './pages/sesiones.component';
import { SessionAddComponent } 						from './pages/sesion-nueva.component';
import { SessionEditComponent } 					from './pages/sesion-editar.component';
import { ParticipantsComponent } 					from './pages/participantes.component';
import { ParticipantEditComponent } 			from './pages/participante-editar.component';
import { ParticipantAddComponent } 				from './pages/participante-nuevo.component'
import { QuestionsComponent } 						from './pages/preguntas.component';
import { ProyectedComponent } 						from './pages/proyectar.component';
import { VotesComponent } 								from './pages/votaciones.component';
import { VoteEditComponent } 							from './pages/votacion-editar.component';
import { VoteAddComponent } 							from './pages/votacion-nueva.component';
import { VotesSessionComponent } 					from './pages/votaciones-sesion.component';
import { ResultsComponent } 							from './pages/resultados.component';
import { ResultsProyectedComponent } 			from './pages/resultados-proyectar.component';
import { ResultSesionProyectedComponent } from './pages/resultados-sesion-proyectar.component';
import { EventsComponent } 								from './pages/eventos.component';
import { EventsAddComponent } 						from './pages/evento-nuevo.component';
import { EventsEditComponent } 						from './pages/evento-editar.component';
import { ChatComponent }                  from './pages/chat.component';

enableProdMode();


@NgModule({
  imports:      [ 
  	BrowserModule,
  	FormsModule,
  	ReactiveFormsModule,
  	TagInputModule,
  	ChartsModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  declarations: [ 
  	AppComponent, 
  	HeaderComponent, 
  	SidebarComponent,
  	PieChartComponent,
  	ObjToArrPipe,
  	ObjKeyToArrPipe,
  	NKDatetime,
  	SELECT_DIRECTIVES,
  	SessionsComponent,
  	SessionAddComponent,
  	SessionEditComponent,
  	ParticipantsComponent,
  	ParticipantEditComponent,
  	ParticipantAddComponent,
  	QuestionsComponent,
  	ProyectedComponent,
  	VotesComponent,
  	VoteEditComponent,
  	VoteAddComponent,
  	VotesSessionComponent,
  	ResultsComponent,
  	ResultsProyectedComponent,
  	ResultSesionProyectedComponent,
  	EventsComponent,
  	EventsAddComponent,
  	EventsEditComponent,
    ChatComponent
	],
	providers: [
    appRoutingProviders,
    FIREBASE_PROVIDERS,
    defaultFirebase({
	    apiKey: "AIzaSyCTfrqErjXXuOPAPWK4AOJBLu3tg2-dJx8",
	    authDomain: "events-7d50b.firebaseapp.com",
	    databaseURL: "https://events-7d50b.firebaseio.com",
	    storageBucket: "events-7d50b.appspot.com"
	    /*apiKey: "AIzaSyB5ZUgBJabSy-F18lNUiyqmb0xy72oFCx4",
	    authDomain: "questions-16537.firebaseapp.com",
	    databaseURL: "https://questions-16537.firebaseio.com",
	    storageBucket: "questions-16537.appspot.com",*/
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