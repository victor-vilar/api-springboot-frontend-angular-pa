import { Address } from '../util/entities/Address';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FullAddressFinderService {

  constructor() { }

  private BASE_URL='https://viacep.com.br/ws/';

  async getFullAddress(cep:string, type:string = 'json'):Promise<any>{
    if(cep !== ''){
      try{
        let fullUrl = this.BASE_URL + cep +'/'+ type;
        let response = await fetch(fullUrl);
        this.checkError(response);
        let address = await response.json();
        return address;
      }catch(error){
        console.log('Não foi possivel encontrar o cep pesquisado ' + error)
      }
    }else{
      alert('o campo não pode ser vazio !');
    }
  }

  private checkError(response:Response){
    if(response.status === 400 || response.status === 404 ){
      throw Error('O cep buscado não foi encontrado !');
     }else if(response.status === 500){
       throw Error('Erro ! não foi possivel conectar com o servidor');
     }
  }
}
