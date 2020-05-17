import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { HeatmapService } from './heatmap.service';
import { Incident } from './incident';
import {} from 'googlemaps';

@Component({
  selector: 'app-heatmap',
  templateUrl: './heatmap.component.html',
  styleUrls: ['./heatmap.component.css']
})

export class HeatmapComponent implements OnInit, AfterViewInit {
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  map: google.maps.Map;

  lat: number;
  lng: number;
  zoom: number;
  incidents: Incident[];
  totalSeconds: number;
  title: string = 'Incidents';

  constructor(private heatmapService: HeatmapService) { }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.initMaps()
  }

  initMaps() {
      const mapOptions = {
          zoom: 13,
          center: {lat: -34.6131500, lng: -58.3772300},
          mapTypeId: google.maps.MapTypeId.TERRAIN
      };
      console.log(this.mapElement.nativeElement);
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);


      this.heatmapService.getAllIncidents().subscribe(
        response => {
          this.incidents = response as Incident[];
          console.log(this.incidents);
          this.eqfeed_callback(JSON.parse(JSON.stringify(this.incidents)));
        });
  }

  getTotalSegundos(results: string | any[]):number {
     var total = 0;
     for (var i = 0; i < results.length; i++) {
         total = total + results[i].seconds;
     }
     return total;
  }

  eqfeed_callback(results: string | any[]):void {
      var total = this.getTotalSegundos(results);
      //Build heatmap
      var heatmapData = [];

      for (var i = 0; i < results.length; i++) {
          var pointList = results[i].location.points;
          for (var j = 0; j < pointList.length; j++) {
              var latLng = new google.maps.LatLng(pointList[j].lat, pointList[j].lng);
              var seconds = results[i].seconds;
              //console.log(seconds/total);
              var weightedLoc = {
                  location: latLng,
                  weight: seconds/total
              };
              heatmapData.push(weightedLoc);
          }
      }
      var heatmap = new google.maps.visualization.HeatmapLayer({
          data: heatmapData,
          dissipating: false,
          map: this.map
      });
  }
}
