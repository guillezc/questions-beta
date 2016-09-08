import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//import { routing } from './app.routing';

import { AppComponent }   from './app.component';
import { HeaderComponent } from './header.component';
import { SidebarComponent } from './sidebar.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ 
  	AppComponent, 
  	HeaderComponent, 
  	SidebarComponent 
	],
  bootstrap:    [ AppComponent ]
})

export class AppModule { }