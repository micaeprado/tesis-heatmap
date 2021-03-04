import { Component, AfterViewInit, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PolygonService } from '../polygon.service';
import { Zone } from 'src/app/module/zone';

interface Country {
  id?: number;
  name: string;
  flag: string;
  area: number;
  population: number;
}

const COUNTRIES: Country[] = [
  {
    name: 'Russia',
    flag: 'f/f3/Flag_of_Russia.svg',
    area: 17075200,
    population: 146989754
  },
  {
    name: 'France',
    flag: 'c/c3/Flag_of_France.svg',
    area: 640679,
    population: 64979548
  },
  {
    name: 'Germany',
    flag: 'b/ba/Flag_of_Germany.svg',
    area: 357114,
    population: 82114224
  },
  {
    name: 'Portugal',
    flag: '5/5c/Flag_of_Portugal.svg',
    area: 92090,
    population: 10329506
  },
  {
    name: 'Canada',
    flag: 'c/cf/Flag_of_Canada.svg',
    area: 9976140,
    population: 36624199
  },
  {
    name: 'Vietnam',
    flag: '2/21/Flag_of_Vietnam.svg',
    area: 331212,
    population: 95540800
  },
  {
    name: 'Brazil',
    flag: '0/05/Flag_of_Brazil.svg',
    area: 8515767,
    population: 209288278
  },
  {
    name: 'Mexico',
    flag: 'f/fc/Flag_of_Mexico.svg',
    area: 1964375,
    population: 129163276
  },
  {
    name: 'United States',
    flag: 'a/a4/Flag_of_the_United_States.svg',
    area: 9629091,
    population: 324459463
  },
  {
    name: 'India',
    flag: '4/41/Flag_of_India.svg',
    area: 3287263,
    population: 1324171354
  },
  {
    name: 'Indonesia',
    flag: '9/9f/Flag_of_Indonesia.svg',
    area: 1910931,
    population: 263991379
  },
  {
    name: 'Tuvalu',
    flag: '3/38/Flag_of_Tuvalu.svg',
    area: 26,
    population: 11097
  },
  {
    name: 'China',
    flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
    area: 9596960,
    population: 1409517397
  }
];

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


  constructor(private polygonService : PolygonService) { }

  collectionSize = COUNTRIES.length;
  countries: Country[];
  page = 1;
  pageSize = 4;
  
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.showAllZones();
  }

  refreshCountries() {
    this.countries = COUNTRIES
      .map((country, i) => ({id: i + 1, ...country}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
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
