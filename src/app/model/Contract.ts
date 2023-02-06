import { ItemContract } from "./ItemContract";
import { Customer } from "./Customer";

export interface Contract{
  id:number;
  beginDate:Date;
  endDate:Date;
  itens:ItemContract[];
  client:Customer;
}
