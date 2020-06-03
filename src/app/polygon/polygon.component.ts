import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { map } from 'rxjs/operators';
import {} from 'googlemaps';

@Component({
  selector: 'app-polygon',
  templateUrl: './polygon.component.html',
  styleUrls: ['./polygon.component.css']
})
export class PolygonComponent implements AfterViewInit {
  title = 'Polygon';
  @ViewChild('map', {static: false}) mapElement: ElementRef;

  constructor() { }

  ngAfterViewInit(): void {
    this.initMap();
  }

  initMap() {
    var map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: {lat: -34.6131500, lng: -58.3772300},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    // Define the LatLng coordinates for the polygon's path. Note that there's
    // no need to specify the final coordinates to complete the polygon, because
    // The Google Maps JavaScript API will automatically draw the closing side.
    var triangleCoords = [
      {lat: 25.774, lng: -80.190},
      {lat: 18.466, lng: -66.118},
      {lat: 32.321, lng: -64.757}
    ];

    var bermudaTriangle = new google.maps.Polygon({
      paths: triangleCoords,
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 3,
      fillColor: '#FF0000',
      fillOpacity: 0.35
    });
    bermudaTriangle.setMap(map);
  }
}
