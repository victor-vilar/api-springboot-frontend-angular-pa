export enum Schedule{

  DIARIO=1,
  SEMANAL=2,
  QUINZENAL=3,
  MENSAL=4,
  SOB_SOLICITACAO=5

}

export function getScheduleValues(){
  return Object.values(Schedule).filter(value => isNaN(Number(value)));
}
