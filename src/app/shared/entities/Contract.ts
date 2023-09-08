import { ItemContract } from "./ItemContract";
import { Customer } from "./Customer";
import { ContractStatus } from "./ContractStatus";

export interface Contract{
  id?:number;
  number:string;
  beginDate:Date;
  endDate:Date;
  contractStatus:ContractStatus;
  itens?:ItemContract[];
  customer?:Customer;
  customerId:string;
}
