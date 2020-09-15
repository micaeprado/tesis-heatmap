import { Component, OnInit } from '@angular/core';
import { AnalyticService } from './analytic.service';
import { FileData } from 'src/app/module/fileData';
import { ModalService } from '../file-modal/modal.service';

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
  newFile: FileData;
  map: Element[];

  constructor(
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
  }

  handleOnFileDataChange(value: FileData) {
    this.fileSelected = value;
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
      this.valueSelected, this.functionSelected, this.functionHeaderSelected)
      .subscribe(
        response => {
          this.map = response as Element[];
        }
      )
  }

}
