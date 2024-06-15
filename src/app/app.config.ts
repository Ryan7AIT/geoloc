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
import { LoginComponent } from './login/login.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';

const routes: Routes = [
  { path: 'realtime', component: RealTimeStatsComponent },
  { path: 'dashboard', component: FmsStatsComponent },
  { path: 'prediction/:thing_id', component: PredictionComponent },
  {path: 'journey', component: JourneyComponent},
  {path: 'admin', component: AdminComponent},
  {path: 'bi', component: BiComponent},
  { path: 'login', component: LoginComponent },
  {path: 'maintenance', component: MaintenanceComponent},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', redirectTo: '/login' }

];

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
  ]
};


