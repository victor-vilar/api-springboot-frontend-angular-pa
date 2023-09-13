import { Residue } from "./Residue";
import { Equipment } from "./Equipment";
import { Contract } from "./Contract";
import { CollectionFrequency} from "./CollectionFrequency"
import { Weekday } from "./Weekday";
import { Schedule } from "./Schedule";
import { MeasurementUnit } from "./MeasurementUnit";

export interface ItemContract{
  id?:number;
  residue:Residue;
  equipment:Equipment;
  equipmentQuantity?:number;
  qtdOfResidue:number;
  itemValue:number;
  description?:string;
  contract?:Contract;
  collectionFrequency?:CollectionFrequency;
  measurementUnit:MeasurementUnit;
}

let equipment1:Equipment= {id:1,equipmentName:'Container 1,2m',sizeInMeterCubic:1.2};
let equipment2:Equipment = {id:2,equipmentName:'Container 240L',sizeInMeterCubic:0.24};

let residue1:Residue = {id:1,type:'extraordinario',description:'residuo extraordinário'};
let residue2:Residue = {id:2,type:'entulho',description:'residuos solidos inertes'};
let residue3:Residue = {id:3,type:'infectante',description:'resíduos hospitalares'};

export let itemContractListForTests:ItemContract[] = [
  {
    id:1,
    residue:residue1,
    equipment:equipment1,
    equipmentQuantity:100,
    qtdOfResidue:100,
    itemValue:200,
    description:'Coleta transporte e destinação final de resíduos extraordinarios, em caminhões compactadores',
    collectionFrequency:{days:[Weekday.SEGUNDA,Weekday.QUARTA,Weekday.SEXTA],schedule:Schedule.SEMANAL},
    measurementUnit:MeasurementUnit.METRO_CUBICO
  },

  {
    id:2,
    residue:residue2,
    equipment:equipment1,
    equipmentQuantity:100,
    qtdOfResidue:100,
    itemValue:200,
    description:'Coleta transporte e destinação final de resíduos extraordinarios, em caminhões poliguindaste',
    collectionFrequency:{days:[Weekday.TERCA,Weekday.QUINTA,Weekday.SABADO],schedule:Schedule.SEMANAL},
    measurementUnit:MeasurementUnit.LITROS
  },

  {
    id:3,
    residue:residue3,
    equipment:equipment2,
    equipmentQuantity:100,
    qtdOfResidue:100,
    itemValue:200,
    description:'Coleta transporte e destinação final de resíduos extraordinarios, em caminhões Baú',
    collectionFrequency:{days:[Weekday.SABADO],schedule:Schedule.SOB_SOLICITACAO},
    measurementUnit:MeasurementUnit.LITROS
  },

  {
    id:4,
    residue:residue3,
    equipment:equipment2,
    equipmentQuantity:100,
    qtdOfResidue:100,
    itemValue:200,
    description:'outro item 4',
    collectionFrequency:{days:[Weekday.SEGUNDA,Weekday.QUARTA,Weekday.SEXTA],schedule:Schedule.MENSAL},
    measurementUnit:MeasurementUnit.QUILOS
  },


];
