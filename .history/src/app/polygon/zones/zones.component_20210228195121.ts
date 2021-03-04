import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PolygonService } from '../polygon.service';
import { Zone } from 'src/app/module/zone';
import { ActivatedRoute } from '@angular/router';


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
  infoWindow: google.maps.InfoWindow;
  page = 1;
  pageSize = 5;
  paginator: any;

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
        this.zones = response as Zone[];
        this.paginator = response
      } );
    });

  }

  ngAfterViewInit(): void {
    this.showAllZones();
  }

  
  showAllZones() {
    this.map =  new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 13,
      center: {lat: -34.6131500, lng: -58.3772300},
      mapTypeId: google.maps.MapTypeId.TERRAIN
    });
    this.infoWindow = new google.maps.InfoWindow();

    this.polygonService.getAllZones()
      .subscribe(response => {
        this.zones = response as Zone[];
        this.zones.forEach(zone => {
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
