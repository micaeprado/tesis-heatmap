import { Component, OnInit, ViewChild, AfterViewInit, ElementRef, Input, OnChanges } from '@angular/core';
import { HeatmapService } from './heatmap.service';
import {} from 'googlemaps';
import { map } from 'rxjs/operators';
import {Element} from 'src/app/module/element';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})

export class HeatmapComponent implements OnChanges, AfterViewInit {
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  @Input()dataMap: Element;
  map: google.maps.Map;
  lat: number;
  lng: number;
  zoom: number;
  totalSeconds: number;
  title: string = 'Heatmap';

  constructor(private heatmapService: HeatmapService) { }

  ngAfterViewInit() {
    this.initMaps();
  }
  ngOnChanges() {
    this.initMaps();
  }

  initMaps() {
      const mapOptions = {
          zoom: 13,
          center: {lat: -34.6131500, lng: -58.3772300},
          mapTypeId: google.maps.MapTypeId.TERRAIN
      };
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

        if(this.dataMap !== null) {
          console.log(this.dataMap);
          this.eqfeed_callback(JSON.parse(JSON.stringify(this.dataMap)));
        }
  }

  getTotalSegundos(results: string | any[]):number {
     var total = 0;
     for (var i = 0; i < results.length; i++) {
         total = total + results[i].seconds;
     }
     return total;
  }

  eqfeed_callback(results: string | any[]):void {
      var heatmapData = [];

      for (var i = 0; i < results.length; i++) {
        console.log(results[i]);
        var latLng = new google.maps.LatLng(results[i].location.lat, results[i].location.lng);
        var weightedLoc = {
            location: latLng,
            weight: results[i].weight
        };
        heatmapData.push(weightedLoc);
      }
      var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          dissipating: false,
          map: this.map
      });
  }
}
