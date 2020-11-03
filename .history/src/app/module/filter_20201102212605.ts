import { ObjectType } from './enumeration/objectType';
import { Point } from './point';

export class FieldFilter {
  id: number;
  type: FilterType;
  objectTypes: ObjectType[];
}
