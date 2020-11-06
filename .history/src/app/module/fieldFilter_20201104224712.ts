import { FilterType } from './enumeration/filterType';

export class FieldFilter {
  id: number;
  field: String;
  filterName: FilterType;
  valuesToFilter: String[];
}
