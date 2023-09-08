import { Schedule } from './Schedule';
import { Weekday } from "./Weekday";

export interface CollectionFrequency {

  days:Weekday[];
  schedule:Schedule;

}
