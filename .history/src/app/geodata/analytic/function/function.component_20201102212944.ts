import { Component, OnInit, Input } from '@angular/core';
import { Layer } from 'src/app/module/layer';
import { FileData } from 'src/app/module/fileData';
import { Filter } from 'src/app/module/filter';


@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  @Input() layer: Layer;
  @Input() fileSelected: FileData;

  filters: Filter;

  constructor() { }

  ngOnInit(): void {
  }

}
