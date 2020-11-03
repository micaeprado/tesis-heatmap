import { Component, OnInit } from '@angular/core';
import { AnalyticService } from './analytic.service';
import { FileData } from 'src/app/module/fileData';
import { ModalService } from '../file-modal/modal.service';
import { Zone } from 'src/app/module/zone';
import { PolygonService } from 'src/app/polygon/polygon.service';
import { Layer } from 'src/app/module/layer';
import { Header } from 'src/app/module/header';
import { ObjectType } from 'src/app/module/enumeration/objectType';
import { Filter } from 'src/app/module/filter';

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
  filters: Filter[];
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

    this.analyticService.getFilters()
    .subscribe(
      response => {
        this.filters = response as Filter[];
      }
    )
  }


  setNumberHeaders(headers: Header[]) {
    headers.forEach(element => {
      if(element.objectType == ObjectType.NUMBER) {
        this.numberHeaders.push(element.header);
      }
    });
  }

  handleOnFileDataChange(value: FileData) {
    this.fileSelected = value;
    this.layer.fileName = value.fileName;
    this.setNumberHeaders(value.header);
  }

  handleOnZoneChange(value: Zone) {
    this.layer.zone = value;
  }

  handleOnFieldToCalculateChange(value: Header) {
    this.layer.fieldToCalculate = value.header;
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

  createMap() {
    this.analyticService.createMap(this.layer)
      .subscribe(
        response => {
          this.dataMap = response as Element[];
        }
      )
  }

}
