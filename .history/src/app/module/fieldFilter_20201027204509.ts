import { FilterType } from './enumeration/filterType';

export class Filter {
  id: number;
  filterName: FilterType;
  field: String;
  valueToFilter: String;
}
