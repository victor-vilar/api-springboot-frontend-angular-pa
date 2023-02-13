import type { Address } from "./Address";
import { Contract } from "./Contract";
import { Supervisor } from "./Supervisor";

export interface Customer{
  cpfCnpj:string;
  nameCompanyName:string;
  contracts?:Contract[];
  supervisors?:Supervisor[];
  addresses?:Address[];
}
