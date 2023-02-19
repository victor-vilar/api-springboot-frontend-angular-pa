import { Residue } from "./Residue";
import { Equipament } from "./Equipament";
import { Contract } from "./Contract";

export interface ItemContract{
  id?:number;
  residue:Residue;
  equipament:Equipament;
  qtdOfResidue:number;
  itemValue:number;
  contract?:Contract;
}
