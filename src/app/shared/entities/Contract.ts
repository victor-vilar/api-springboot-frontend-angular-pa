import { ItemContract, itemContractListForTests } from "./ItemContract";
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


export let ContactListForTests:Contract[] = [
  {
    id:1,
    number:'1000',
    beginDate:new Date("2023/09/01"),
    endDate:new Date("2023/09/30"),
    contractStatus:ContractStatus.ATIVO,
    itens:itemContractListForTests,
    customerId:'08080808'
  },
  {
    id:2,
    number:'2000',
    beginDate:new Date("2023/09/01"),
    endDate:new Date("2023/09/30"),
    contractStatus:ContractStatus.RENOVACAO_PENDENTE,
    itens:itemContractListForTests,
    customerId:'08080808'
  },
  {
    id:3,
    number:'2000',
    beginDate:new Date("2023/09/01"),
    endDate:new Date("2023/09/30"),
    contractStatus:ContractStatus.ATIVO,
    itens:itemContractListForTests,
    customerId:'08080808'
  }
]
