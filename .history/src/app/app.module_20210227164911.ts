import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HeatmapComponent } from './heatmap/heatmap.component';
import { PaginatorComponent } from './paginator/paginator.component';

import { HeatmapService } from './heatmap/heatmap.service';
import { PolylineComponent } from './polygon/polyline.component';
import { PolygonComponent } from './polygon/polygon.component';
import { PolygonService } from './polygon/polygon.service';
import { ZonesComponent } from './polygon/zones/zones.component';
import { NgxCsvParserModule } from 'ngx-csv-parser';
import { DataLoaderComponent } from './geodata/data-loader/data-loader.component';
import { FileModalComponent } from './geodata/file-modal/file-modal.component';
import { AnalyticComponent } from './geodata/analytic/analytic.component';
import { ModalService } from './geodata/file-modal/modal.service';
import { DataLoaderService } from './geodata/data-loader/data-loader.service';
import { AnalyticService } from './geodata/analytic/analytic.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import {MatSelectModule} from '@angular/material/select';
import { FunctionComponent } from './geodata/analytic/function/function.component';
import { MapComponent } from './map/map.component'

const routes : Routes = [
  {path: '', redirectTo: '/incident', pathMatch: 'full'},
  {path: 'heatmap', component: HeatmapComponent},
  {path: 'polyline', component: PolylineComponent},
  {path: 'polygon', component: PolygonComponent},
  {path: 'zones', component: ZonesComponent},
  {path: 'newMap', component: AnalyticComponent},
  {path: 'map', component: MapComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HeatmapComponent,
    PaginatorComponent,
    PolylineComponent,
    PolygonComponent,
    ZonesComponent,
    DataLoaderComponent,
    FileModalComponent,
    AnalyticComponent,
    FunctionComponent,
    MapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxCsvParserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSelectModule
  ],
  exports: [
    PolygonComponent
  ],
  providers: [HeatmapService,
  PolygonService,
  DataLoaderService,
  ModalService,
  AnalyticService],
  bootstrap: [AppComponent]
})
export class AppModule { }
