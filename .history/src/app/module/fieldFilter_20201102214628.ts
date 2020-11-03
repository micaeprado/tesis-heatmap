import { FilterType } from './enumeration/filterType';

export class FieldFilter {
  id: number;
  filterName: FilterType;
  field: String;
  valuesToFilter: String[];
}
