import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  modal: boolean = false;
  private _notificarUpload = new EventEmitter<any>();

  constructor() { }

  get notificarUpload():EventEmitter<any> {
    return this._notificarUpload;
  }

  modalIsOpen():boolean{
    return this.modal;
  }

  openModal(){
    this.modal = true;
  }

  closeModal(){
    this.modal = false;
  }
}
