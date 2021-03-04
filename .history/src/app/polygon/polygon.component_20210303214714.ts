  import { Component, AfterViewInit, ViewChild, ElementRef, Input, SimpleChanges, OnChanges } from '@angular/core';
  import { map } from 'rxjs/operators';
  import {} from 'googlemaps';
  import { PolygonService } from './polygon.service';
  import { Router, ActivatedRoute } from '@angular/router';
  import swal from 'sweetalert2'
import { Zone } from '../module/zone';
import { Point } from '../module/point';


  @Component({
    selector: 'app-polygon',
    templateUrl: './polygon.component.html',
    styleUrls: ['./polygon.component.css']

  })
  export class PolygonComponent implements AfterViewInit {
    title = 'Polygon';
    @ViewChild('mapPolygon', {static: false}) mapElement: ElementRef;
    polygon: google.maps.Polygon;
    map: google.maps.Map;
    name: string;
    markers = [];
    points :any;
    errors: string[];

    constructor(
      private polygonService : PolygonService,
      private router: Router
      ) { }

    ngAfterViewInit(): void {
      this.initMap();
    }

    initMap() :void{
      this.map =  new google.maps.Map(this.mapElement.nativeElement, {
        zoom: 13,
        center: {lat: -34.6131500, lng: -58.3772300},
        mapTypeId: google.maps.MapTypeId.TERRAIN
    });

      this.polygon = new google.maps.Polygon({
        editable:true,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      });

      this.polygon.setMap(this.map);
      this.map.addListener('click', (e) =>
          this.addLatLng(e, this.polygon, this.map));

      google.maps.event.addListener(this.polygon, 'rightclick',
            (e) => this.deleteVertex(e));

      this.points = this.polygon.getPath().getArray();
    }

    deleteVertex(event) {
      if (event.vertex == undefined) {
        return;
      }
      if (event.vertex != null) {
        this.polygon.getPath().removeAt(event.vertex);
      }
    }

    addLatLng(e: google.maps.MouseEvent | google.maps.IconMouseEvent,
    polygon: google.maps.Polygon, map: google.maps.Map<any>):void {
      let path = polygon.getPath()
      path.push(e.latLng);

      const marker = new google.maps.Marker({
         position: e.latLng,
         icon: {
               path: google.maps.SymbolPath.CIRCLE,
               scale: 0
         },
         title: '#' + path.getLength(),
         map: map
       });
     this.markers.push(marker);
   }

    addLine():void {
      this.polygon.setMap(this.map);
    }

    removeLine():void {
      this.polygon.setMap(null);
    }

  saveNewPolygon(): void {
    this.polygonService.create(this.getZone())
    .subscribe( zona => {
        this.router.navigate(['/polygon'])
        swal.fire('Nueva Zona', `La zona ha sido creado con éxito!`, 'success')
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Código del error desde el Backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  getZone(): Zone  {
    let polygonBounds = this.points;
    var bounds:Point[] = [];
    for (var i = 0; i < polygonBounds.length; i++) {
        var point:Point = new Point();
        point.lat = polygonBounds[i].lat();
        point.lng = polygonBounds[i].lng();
        bounds.push(point);
      }
    var zone: Zone = new Zone();
    zone.points = bounds
    zone.name = this.name;
    return zone;
  }



}
