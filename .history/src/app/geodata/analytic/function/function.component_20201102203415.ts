import { Component, OnInit, Input } from '@angular/core';
import { Layer } from 'src/app/module/layer';

@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  @Input() layer: Layer;

  constructor() { }

  ngOnInit(): void {
  }

}
