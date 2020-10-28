import { Zone } from './zone';
import { FieldFilter } from './filter';

export class Layer {
  id: number;
  fileName: String;
  functionName: String;
  fieldToCalculate: String;
  zone: Zone;
  fieldFilters: FieldFilter[];
}
