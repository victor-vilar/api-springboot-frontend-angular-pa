export enum ContractStatus{
  ATIVO=1,
  CANCELADO=2,
  RENOVACAO_PENDENTE=3,
  ENCERRADO=4

}

export function getContractStatusValues(){
  return Object.values(ContractStatus).filter(value => isNaN(Number(value)));
}
