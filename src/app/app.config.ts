import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { Routes } from '@angular/router';

import { RealTimeStatsComponent } from './real-time-stats/real-time-stats.component';
import { FmsStatsComponent } from './fms-stats/fms-stats.component';
import { PredictionComponent } from './prediction/prediction.component';
import { JourneyComponent } from './journey/journey.component';
import { AdminComponent } from './admin/admin.component';
import { BiComponent } from './bi/bi.component';

const routes: Routes = [
  { path: 'realtime', component: RealTimeStatsComponent },
  { path: 'dashboard', component: FmsStatsComponent },
  { path: 'prediction/:thing_id', component: PredictionComponent },
  {path: 'journey', component: JourneyComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'bi', component: BiComponent},
  { path: '', redirectTo: '/realtime', pathMatch: 'full' }
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
  ]
};


