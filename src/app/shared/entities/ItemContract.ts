import { Residue } from "./Residue";
import { Equipment } from "./Equipment";
import { Contract } from "./Contract";
import { CollectionFrequency} from "./CollectionFrequency"

export interface ItemContract{
  id?:number;
  residue:Residue;
  equipment:Equipment;
  equipmentQuantity:number;
  qtdOfResidue:number;
  itemValue:number;
  description?:string;
  contract?:Contract;
  collectionFrequency:CollectionFrequency;
}
