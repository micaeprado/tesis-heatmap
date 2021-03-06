import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PolygonService } from '../polygon.service';
import { Zone } from 'src/app/module/zone';
import { ActivatedRoute } from '@angular/router';
import { Point } from '../../module/point';


@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements AfterViewInit , OnInit{
  title = 'Zones';
  @ViewChild('mapZones', {static: false}) mapElement: ElementRef;
  map: google.maps.Map;
  zones: Zone[];
  zonesPerPage: Zone[];
  selectedZone: Zone;
  infoWindow: google.maps.InfoWindow;
  paginator: any;
  link:string = "/polygon/page";
  polygon: google.maps.Polygon;

  constructor(
    private polygonService : PolygonService, 
    private activatedRoute: ActivatedRoute
    ) {}


  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( params=>{
      let page:number = +params.get('page');
      if(!page){
        page = 0
      }

      this.polygonService.getZonesPerPage(page)
      .subscribe(response => {
        this.zonesPerPage = response.content as Zone[];
        this.paginator = response
      } );
    });

  }

  ngAfterViewInit(): void {
    this.map =  new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: {lat: -34.6131500, lng: -58.3772300},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    this.infoWindow = new google.maps.InfoWindow();
  }

  showZone(id) {
    const  bounds = new google.maps.LatLngBounds();

    this.polygonService.getZone(id)
      .subscribe(response => {
        this.selectedZone = response as Zone;

     
        
        const newMap =  new google.maps.Map(this.mapElement.nativeElement, {
          zoom: 13,
          center: {lat: -34.6131500, lng: -58.3772300},
          mapTypeId: google.maps.MapTypeId.TERRAIN
        });

        const newPolygon = new google.maps.Polygon({
          paths: this.selectedZone.points,
          strokeColor: "#FF0000",
          strokeOpacity: 0.8,
          strokeWeight: 3,
          fillColor: "#FF0000",
          fillOpacity: 0.35
        });
        newPolygon.setMap(newMap);
        newPolygon.addListener("click", (event) => {this.showName(event, this.selectedZone.name, newMap)});
      });
  }

  
  showAllZones() {
    this.polygonService.getAllZones()
      .subscribe(response => {
        this.zones = response as Zone[];
        this.zones.forEach(zone => {
          console.log(zone.points);
          const newPolygon = new google.maps.Polygon({
            paths: zone.points,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 3,
            fillColor: "#FF0000",
            fillOpacity: 0.35
          });
          newPolygon.setMap(this.map);
          newPolygon.addListener("click", (event) => {this.showName(event, zone.name, this.map)});
        })
      });
  }

  showName(event, name, map) {
  this.infoWindow.setContent(name);
  this.infoWindow.setPosition(event.latLng);
  this.infoWindow.open(map);
}


}
