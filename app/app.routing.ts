import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ParticipantsComponent } from './pages/participantes.component';
import { ParticipantEditComponent } from './pages/participante-editar.component'

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/participantes',
    pathMatch: 'full'
  },
  {
    path: 'participantes',
    component: ParticipantsComponent
  },
  {
    path: 'participante/editar/:id',
    component: ParticipantEditComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);