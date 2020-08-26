import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from './modal.service';
import swal from 'sweetalert2';
import { DataLoaderService } from '../data-loader.service';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'file-modal',
  templateUrl: './file-modal.component.html',
  styleUrls: ['./file-modal.component.css']
})
export class FileModalComponent implements OnInit {
  @Input()items:String[];
  @Input()file: File;
  @Input()fileName: string;
  longitude:string;
  latitude:string;
  separator:string;
  quote:string;
  errors: string[];

  constructor(
    private modalService: ModalService,
    private dataLoaderService: DataLoaderService) { }

  ngOnInit(): void {}

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

}
