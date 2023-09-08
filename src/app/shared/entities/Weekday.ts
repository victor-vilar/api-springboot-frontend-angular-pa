export enum Weekday{

  DOMINGO=1,
  SEGUNDA=2,
  TERCA=3,
  QUARTA=4,
  QUINTA=5,
  SEXTA=6,
  SABADO=7
}

export function getWeekdayValues(){
  return Object.values(Weekday).filter(value => isNaN(Number(value)));
}

export function getWeekdayIndex(WeekDay){
  //return Object.values(WeekDay).filter(value=> )
}
