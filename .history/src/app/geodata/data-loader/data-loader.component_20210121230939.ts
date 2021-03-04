import { Component, OnInit } from '@angular/core';
import { DataLoaderService } from './data-loader.service';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';
import { ModalService } from '../file-modal/modal.service';

@Component({
  selector: 'app-data-loader',
  templateUrl: './data-loader.component.html'
})
export class DataLoaderComponent implements OnInit {
  titulo: String = "Cargar archivo CSV";
  header = false;
  file: File;
  items: String[];
  fileName: String = "Seleccionar archivo CSV";

  constructor(
    private dataLoaderService: DataLoaderService,
    private ngxCsvParser: NgxCsvParser,
    private modalService: ModalService) { }

  ngOnInit(): void {}

  selectFile(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fileName = this.file.name;
    }
  }

  readHeader() {
    this.ngxCsvParser.parse(this.file, { header: this.header, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        this.items = result[0][0].split(";"); // ; por que se lista separado en ;
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

}
