import { Schedule } from '../enums/Schedule';
import { Weekday } from "../enums/Weekday";

export interface CollectionFrequency {

  days:Weekday[];
  schedule:Schedule;

}
