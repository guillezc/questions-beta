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

import { VotesComponent } from './pages/votaciones.component';
import { VoteEditComponent } from './pages/votacion-editar.component';
import { VoteAddComponent } from './pages/votacion-nueva.component';
import { SurveysComponent } from './pages/encuestas.component';
import { SurveyAddComponent } from './pages/encuesta-nueva.component';
import { SurveyEditComponent } from './pages/encuesta-editar.component';

import { ResultsComponent } from './pages/resultados.component';
import { ResultsProyectedComponent } from './pages/resultados-proyectar.component';

import { VotesSessionComponent } from './pages/votaciones-sesion.component';
import { ResultSesionProyectedComponent } from './pages/resultados-sesion-proyectar.component';

import { EventsComponent } from './pages/eventos.component';
import { EventsAddComponent } from './pages/evento-nuevo.component';
import { EventsEditComponent } from './pages/evento-editar.component';

import { ChatComponent } from './pages/chat.component';
import { TagsComponent } from './pages/temas.component';

import { FrequentQuestionsComponent } from './pages/preguntas-frecuentes.component';
import { FrequentQuestionsAddComponent } from './pages/preguntas-frecuentes-nuevo.component';
import { FrequentQuestionsEditComponent } from './pages/preguntas-frecuentes-editar.component';

import { GeneralInfoComponent } from './pages/info-general.component';
import { GeneralInfoAddComponent } from './pages/info-general-nuevo.component';
import { GeneralInfoEditComponent } from './pages/info-general-editar.component';

import { SponsorsComponent } from './pages/patrocinadores.component';
import { SponsorAddComponent } from './pages/patrocinador-nuevo.component';
import { SponsorEditComponent } from './pages/patrocinador-editar.component';

import { MaterialsComponent } from './pages/materiales.component';
import { MaterialAddComponent } from './pages/material-nuevo.component';

import { LocationsComponent } from './pages/locaciones.component';
import { LocationAddComponent } from './pages/locacion-nuevo.component';
import { LocationEditComponent } from './pages/locacion-editar.component';

import { LoginComponent } from './pages/login.component';
import { DashboardComponent } from './pages/panel.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/eventos',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'panel',
    component: DashboardComponent
  },
  {
    path: 'eventos',
    component: EventsComponent
  },
  {
    path: 'evento/nuevo',
    component: EventsAddComponent
  },
  {
    path: 'evento/editar/:id',
    component: EventsEditComponent
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
  },
  {
    path: 'votaciones',
    component: VotesComponent
  },
  {
    path: 'votacion/nueva',
    component: VoteAddComponent
  },
  {
    path: 'votacion/editar/:id',
    component: VoteEditComponent
  },
  {
    path: 'votaciones/sesion/:id',
    component: VotesSessionComponent
  },
  {
    path: 'encuestas',
    component: SurveysComponent
  },
  {
    path: 'encuesta/nueva',
    component: SurveyAddComponent
  },
  {
    path: 'encuesta/editar/:id',
    component: SurveyEditComponent
  },
  {
    path: 'resultados/:id',
    component: ResultsComponent
  },
  {
    path: 'resultadosProyectados/:id',
    component: ResultsProyectedComponent
  },
  {
    path: 'resultadosSesionProyectados/:id',
    component: ResultSesionProyectedComponent
  },
  {
    path: 'chat',
    component: ChatComponent
  },
  {
    path: 'temas',
    component: TagsComponent
  },
  {
    path: 'preguntas-frecuentes',
    component: FrequentQuestionsComponent
  },
  {
    path: 'pregunta-frecuente/nuevo',
    component: FrequentQuestionsAddComponent
  },
  {
    path: 'pregunta-frecuente/editar/:id',
    component: FrequentQuestionsEditComponent
  },
  {
    path: 'info-general',
    component: GeneralInfoComponent
  },
  {
    path: 'info-general/nuevo',
    component: GeneralInfoAddComponent
  },
  {
    path: 'info-general/editar/:id',
    component: GeneralInfoEditComponent
  },
  {
    path: 'patrocinadores',
    component: SponsorsComponent
  },
  {
    path: 'patrocinador/nuevo',
    component: SponsorAddComponent
  },
  {
    path: 'patrocinador/editar/:id',
    component: SponsorEditComponent
  },
  {
    path: 'materiales',
    component: MaterialsComponent
  },
  {
    path: 'material/nuevo',
    component: MaterialAddComponent
  },
  {
    path: 'material/nuevo/:id/:type',
    component: MaterialAddComponent
  },
  {
    path: 'locaciones',
    component: LocationsComponent
  },
  {
    path: 'locacion/nuevo',
    component: LocationAddComponent
  },
  {
    path: 'locacion/editar/:id',
    component: LocationEditComponent
  }
];

export const appRoutingProviders: any[] = [

];

export const routes: any[] = appRoutes;

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);