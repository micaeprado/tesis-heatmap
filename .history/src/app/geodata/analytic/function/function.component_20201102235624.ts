import { Component, OnInit, Input } from '@angular/core';
import { Layer } from 'src/app/module/layer';
import { FileData } from 'src/app/module/fileData';
import { Filter } from 'src/app/module/filter';
import { FilterType } from 'src/app/module/enumeration/filterType';
import { AnalyticService } from '../analytic.service';
import { FieldFilter } from 'src/app/module/fieldFilter';


@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  @Input() layer: Layer;
  @Input() fileSelected: FileData; //para field header
  filters: FilterType; //lista de filtros que hay
  valuesToFilter: string[];

  responses: FieldFilter[] = [];


  constructor( private analyticService: AnalyticService) { }

  ngOnInit(): void {
  }

  addNewFilter() {
    const filter: FieldFilter = {id: null, filterName: FilterType.EQUAL, field:null, valuesToFilter:[]};
    this.responses.push(filter);
  }

  removeFilter(i) {
    this.responses.splice(i, 1);
  }

  handleOnFieldChange(value, i) {
    this.responses[i].field = value;
    this.analyticService.getFiltersByHeader(this.fileSelected.fileName, value)
    .subscribe(
      response => {
        this.valuesToFilter = response as string[];
      }
    )
  }

  handleOnFilterChange(value, i) {
    this.responses[i].valuesToFilter = value; //los que habia mas value (hacer eso)
  }

}
