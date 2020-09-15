import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { DataLoaderService } from '../data-loader/data-loader.service';
import { NgxCsvParser, NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.css']
})
export class FileModalComponent {
  @Input()newFile: File;
  title: string = 'Cargar CSV';
  longitude:string;
  latitude:string;
  separator:string;
  quote:string;
  errors: string[];
  header = false;
  file: File;
  items: String[];
  fileName: String = "Seleccionar archivo CSV";

  constructor(
    private modalService: ModalService,
    private dataLoaderService: DataLoaderService,
    private ngxCsvParser: NgxCsvParser) { }

  modalIsOpen():boolean{
    return this.modalService.modalIsOpen();
  }

  closeModal(){
    this.modalService.closeModal();
  }

  saveElementsAndUploadFile() {
    if(!this.file){
      swal.fire('Error Upload', 'Debe seleccionar un archivo CSV', 'error');
    } else {
      console.log(this.quote);
      this.dataLoaderService.uploadFile(this.file, this.latitude, this.longitude,
        this.separator, this.quote)
      .subscribe( event => {
        if(event.type === HttpEventType.Response) {
            swal.fire('El archivo CSV se ha subido correctamente',
                this.file.name, 'success');
          }
      },
        err => {
          this.errors = err.error.errors as string[];
          console.error('Código del error desde el Backend: ' + err.status);
          console.error(err.error.errors);
        }
      );
      this.closeModal();
    }
  }

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
        this.items = result[0][0].split(";");
        //this.modalService.openModal();
      }, (error: NgxCSVParserError) => {
        console.log('Error', error);
      });
  }

}
