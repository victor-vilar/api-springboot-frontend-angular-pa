import { ItemContract } from "./ItemContract";
import { Customer } from "./Customer";

export interface Contract{
  id?:number;
  number:string;
  beginDate:Date;
  endDate:Date;
  itens?:ItemContract[];
  client?:Customer;
}
