import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Layer } from '../layer';

@Injectable({
  providedIn: 'root'
})
export class LayerService {

  private routerInfo: BehaviorSubject<Layer>;
  constructor() {
    this.routerInfo = new BehaviorSubject<Layer>(new Layer);
  }

  getLayer(): Observable<Layer> {
    return this.routerInfo.asObservable();
  }
  setLayer(newValue): void {
    this.routerInfo.next(newValue);
  }
}
