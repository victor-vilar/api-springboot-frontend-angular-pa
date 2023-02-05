import { ItemContract } from "./ItemContract";
import { Client } from "./Client";

export interface Contract{
  id:number;
  beginDate:Date;
  endDate:Date;
  itens:ItemContract[];
  client:Client;
}
