import { Component, OnInit } from '@angular/core';
import { AnalyticService } from './analytic.service';
import { FileData } from 'src/app/module/fileData';
import { ModalService } from '../file-modal/modal.service';
import { Zone } from 'src/app/module/zone';
import { PolygonService } from 'src/app/polygon/polygon.service';
import { Layer } from 'src/app/module/layer';
import { Header } from 'src/app/module/header';
import { ObjectType } from 'src/app/module/enumeration/objectType';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-analytic',
  templateUrl: './analytic.component.html',
  styleUrls: ['./analytic.component.css']
})

export class AnalyticComponent implements OnInit {
  title: string = 'Crear Mapa';
  filesData: FileData[];
  filter: string[];
  functions: string[];
  values: string[];
  fileSelected: FileData;
  dataMap: Element[] = null;
  zones: Zone[];
  map: google.maps.Map;
  layer: Layer = new Layer;
  showFilters: boolean = false;
  numberHeaders: string[] = [];
  //functionHeaderSelected: string;
  //filterHeaderSelected: string;
  //valueSelected:string;
  //functionSelected:string;
  //selectedZone: Zone;

  constructor(
    private polygonService : PolygonService,
    private analyticService: AnalyticService,
    private modalService: ModalService) { }

  ngOnInit(): void {
    this.analyticService.getAllFileData().subscribe(
      response => {
        this.filesData = response as FileData[];
      });

    this.analyticService.getFunctions().subscribe(
      response => {
        this.functions = response as string[]
      }
    )

    this.polygonService.getAllZones().subscribe(
      response => {
        this.zones = response as Zone[]
      }
    )
  }


  setNumberHeaders(headers: Header[]) {
    headers.forEach(element => {
      if(element.objectType == ObjectType.NUMBER) {
        this.numberHeaders.push(element.header);
      }
      console.log(element.objectType == ObjectType.NUMBER);
    });
  }

  handleOnFileDataChange(value: FileData) {
    this.fileSelected = value;
    this.layer.fileName = value.fileName;
    console.log(this.fileSelected.header);
    this.setNumberHeaders(value.header);
  }

  handleOnZoneChange(value: Zone) {
    console.log(value);
    this.layer.zone = value;
  }

  handleOnFieldToCalculateChange(value: Header) {
    this.layer.fieldToCalculate = value.header;
    console.log(this.layer.fileName);
  }

  changeShowFilters() {
    this.showFilters = true;
  }

  addNewFile(file: FileData) {
    this.filesData.push(file);
  }

  openModal() {
    this.modalService.openModal();
  }


  handleOnFilterHeaderChange(value) {
  //  this.filterHeaderSelected = value;
    this.analyticService.getFiltersByHeader(this.fileSelected.fileName, value)
    .subscribe(
      response => {
        this.filter = response as string[];
      }
    )
  }

  createMap() {
    this.analyticService.createMap(this.layer)
      .subscribe(
        response => {
          this.dataMap = response as Element[];
        }
      )
  }

}
