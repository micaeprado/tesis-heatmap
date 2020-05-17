import { Location } from './location';

export class Incident {
  id: number;
  type: string;
  startTime: string;
  endTime: string;
  location: Location;
}
