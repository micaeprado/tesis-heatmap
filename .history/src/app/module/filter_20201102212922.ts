import { FilterType } from './enumeration/filterType';
import { ObjectType } from './enumeration/objectType';
import { Point } from './point';

export class Filter {
  id: number;
  type: FilterType;
  objectTypes: ObjectType[];
}
