import { FieldFilter } from './fieldFilter';
import { Zone } from './zone';

export class Layer {
  id: number;
  fileName: String;
  functionName: String;
  fieldToCalculate: String;
  zone: Zone;
  fieldFilters: FieldFilter[];
}
