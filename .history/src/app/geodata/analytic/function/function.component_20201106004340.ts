import { Component, OnInit, Input } from '@angular/core';
import { Layer } from 'src/app/module/layer';
import { FileData } from 'src/app/module/fileData';
import { Filter } from 'src/app/module/filter';
import { FilterType } from 'src/app/module/enumeration/filterType';
import { AnalyticService } from '../analytic.service';
import { FieldFilter } from 'src/app/module/fieldFilter';
import { Header } from 'src/app/module/header';
import { ObjectType } from 'src/app/module/enumeration/objectType';
import { LayerService } from 'src/app/module/entity/layer.service';


@Component({
  selector: 'app-function',
  templateUrl: './function.component.html',
  styleUrls: ['./function.component.css']
})
export class FunctionComponent implements OnInit {

  @Input() fileSelected: FileData; //para field header
  valuesToFilter: string[][] = [[]];
  responses: FieldFilter[] = [];
  filters: Filter[];
  filtersAllowed: FilterType[][] = [[]];
  layer: Layer;

  constructor( private analyticService: AnalyticService,
    private layerService: LayerService) { }

  ngOnInit(): void {
    this.analyticService.getFilters()
    .subscribe(
      response => {
        this.filters = response as Filter[];
      }
    )

    this.layerService.getLayer()
    .subscribe(
      response => {this.layer = response as Layer}
    )
      console.log(this.layer);
  }

  addNewFilter() {
    const filter: FieldFilter = {id: null, filterName: FilterType.EQUAL, field:null, valuesToFilter:[]};
    this.responses.push(filter);
  }

  removeFilter(i) {
    this.responses.splice(i, 1);
  }

  setFiltersAlowed(i, value: ObjectType) {
    const headerFiltersAlowed: FilterType[] = [];
    this.filters.forEach(element => {
      if(element.objectTypes.includes(value)) {
        headerFiltersAlowed.push(element.type);
      }
    });
    
    this.filtersAllowed.splice(i, 1, headerFiltersAlowed);
  }

  handleOnFieldChange(value: Header, i) {
    this.responses[i].field = value.header;
    this.setFiltersAlowed(i, value.objectType);
    this.analyticService.getValuesToFilterByHeader(this.fileSelected.fileName, value.header)
    .subscribe(
      response => {
        this.valuesToFilter.splice(i, 1, response as string[]);
      }
    )
    this.layer.fieldFilters = this.responses;
    this.layerService.setLayer(this.layer);
  }

  handleOnFilterChange(value, i) {
    this.responses[i].filterName = value; //los que habia mas value (hacer eso)
    this.layer.fieldFilters = this.responses;
    this.layerService.setLayer(this.layer);
  }

  handleOnValuesChange(value, i){
    this.responses[i].valuesToFilter.push(value);
    console.log(value);
    console.log(this.responses[i].valuesToFilter);
    this.layer.fieldFilters = this.responses;
    this.layerService.setLayer(this.layer);
    console.log(this.layer);
  }

}
