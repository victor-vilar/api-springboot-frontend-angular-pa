export enum MeasurementUnit {
  METRO_CUBICO,
  QUILOS,
  LITROS,
  EQUIPAMENTO
}


export function getContractStatusValues(){
  return Object.values(MeasurementUnit).filter(value => isNaN(Number(value)));
}
