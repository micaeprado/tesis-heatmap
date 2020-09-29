import { Component, OnInit } from '@angular/core';
import { AnalyticService } from './analytic.service';
import { FileData } from 'src/app/module/fileData';
import { ModalService } from '../file-modal/modal.service';
import { Zone } from 'src/app/module/zone';
import { PolygonService } from 'src/app/polygon/polygon.service';

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
  functionHeaderSelected: string;
  filterHeaderSelected: string;
  valueSelected:string;
  functionSelected:string;
  dataMap: Element[] = null;
  zones: Zone[];
  selectedZone: Zone;

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

  handleOnFileDataChange(value: FileData) {
    this.fileSelected = value;
  }

  handleOnZoneChange(value: Zone) {
    console.log(value);
    this.selectedZone = value;
  }

  addNewFile(file: FileData) {
    this.filesData.push(file);
  }

  openModal() {
    this.modalService.openModal();
  }

  handleOnFilterHeaderChange(value) {
    this.filterHeaderSelected = value;
    this.analyticService.getFiltersByHeader(this.fileSelected.fileName, value)
    .subscribe(
      response => {
        this.filter = response as string[];
      }
    )
  }

  createMap() {
    this.analyticService.createMap(this.fileSelected.fileName, this.filterHeaderSelected,
      this.valueSelected, this.functionSelected,
       this.functionHeaderSelected, this.selectedZone.id)
      .subscribe(
        response => {
          this.dataMap = response as Element[];
        }
      )
  }

}
