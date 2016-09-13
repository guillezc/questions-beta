import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SessionsComponent } from './pages/sesiones.component';
import { SessionAddComponent } from './pages/sesion-nueva.component';
import { SessionEditComponent } from './pages/sesion-editar.component';

import { ParticipantsComponent } from './pages/participantes.component';
import { ParticipantEditComponent } from './pages/participante-editar.component';
import { ParticipantAddComponent } from './pages/participante-nuevo.component';

import { QuestionsComponent } from './pages/preguntas.component';
import { ProyectedComponent } from './pages/proyectar.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/sesiones',
    pathMatch: 'full'
  },
  {
    path: 'sesiones',
    component: SessionsComponent
  },
  {
    path: 'sesion/nueva',
    component: SessionAddComponent
  },
  {
    path: 'sesion/editar/:id',
    component: SessionEditComponent
  },
  {
    path: 'participantes',
    component: ParticipantsComponent
  },
  {
    path: 'participante/editar/:id',
    component: ParticipantEditComponent
  },
  {
    path: 'participante/nuevo',
    component: ParticipantAddComponent
  },
  {
    path: 'preguntas',
    component: QuestionsComponent
  },
  {
    path: 'proyectar',
    component: ProyectedComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);