import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { IncidentComponent } from './heatmap/incident/incident.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { HeatmapService } from './heatmap/heatmap.service';

const routes : Routes = [
  {path: '', redirectTo: '/incident', pathMatch: 'full'},
  {path: 'incident', component: IncidentComponent},
  {path: 'incident/page/:page', component: IncidentComponent},
  {path: 'heatmap', component: HeatmapComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeatmapComponent,
    IncidentComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [HeatmapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
