import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';


@Component({
  selector: 'app-polyline',
  templateUrl: './polyline.component.html',
  styleUrls: ['./polyline.component.css']
})
export class PolylineComponent implements  AfterViewInit {
  title = 'Polyline';
  @ViewChild('map', {static: false}) mapElement: ElementRef;
  static markers = [];
  points :any;
  finalPoints :any;

  constructor() { }

  ngAfterViewInit() {
   this.initMap();
  }

  initMap() {
    var map= new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: {lat: -34.6131500, lng: -58.3772300},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });

    var poly = new google.maps.Polyline({
      geodesic: true,
      editable: true,
      strokeColor: '#000000',
      strokeOpacity: 1.0,
      strokeWeight: 3
    });
    poly.setMap(map);

    // Add a listener for the click event
    map.addListener('click',  function(e) {
      PolylineComponent.addLatLng(e, poly, map);
    });

    // Add a listener for the click event
    google.maps.event.addListener(poly, 'rightclick', function(e) {
      // Check if click was on a vertex control point
      if (e.vertex == undefined) {
        return;
      }
      if (e.vertex != null) {
        poly.getPath().removeAt(e.vertex);
      }
    });

    this.points = poly.getPath();
  }

   static addLatLng(e: google.maps.MouseEvent | google.maps.IconMouseEvent, poly: google.maps.Polyline, map: google.maps.Map<any>) {
    let path = poly.getPath();
    // Because path is an MVCArray, we can simply append a new coordinate
    // and it will automatically appear.
    path.push(e.latLng);

    // Add a new marker at the new plotted point on the polyline.
    const marker = new google.maps.Marker({
      position: e.latLng,
      icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 3
      },
      title: '#' + path.getLength(),
      map: map
    });
    this.markers.push(marker);
  }

  addPoints() {
    console.log(this.points);
    this.finalPoints = Object.assign(this.points);
  }

}
