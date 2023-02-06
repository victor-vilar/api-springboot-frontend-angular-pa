import type { Address } from "./Address";
import { Contract } from "./Contract";
import { Supervisor } from "./Supervisor";

export interface Customer{
  id:number;
  nameCompanyName:string;
  contracts:Contract[];
  supervisors:Supervisor[];
  addresses:Address[];
}
