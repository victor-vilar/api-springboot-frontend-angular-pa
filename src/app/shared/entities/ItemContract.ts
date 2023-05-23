import { Residue } from "./Residue";
import { Equipment } from "./Equipment";
import { Contract } from "./Contract";

export interface ItemContract{
  id?:number;
  residue:Residue;
  equipment:Equipment;
  qtdOfResidue:number;
  itemValue:number;
  contract?:Contract;
}
