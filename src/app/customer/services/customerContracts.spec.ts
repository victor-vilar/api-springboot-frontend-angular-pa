
import { ContactListForTests } from './../../shared/entities/Contract';

import { TestBed } from "@angular/core/testing";
import { CustomerContractsService } from "./customerContracts.service";

import { Schedule } from 'src/app/shared/enums/Schedule';
import { HttpClient } from '@angular/common/http';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ContractStatus } from 'src/app/shared/enums/ContractStatus';


describe('Customer Contract Service', () => {

  let service: CustomerContractsService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;



  beforeEach(() => {


    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
      CustomerContractsService
      ]
    });

    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CustomerContractsService);


  });

  it('should find all the itemContract that is equals Schedule.SEMANAL',() =>{
      service.list = ContactListForTests;
      let list = service.getAllItemContractThatHasScheduleType(Schedule.SEMANAL);
      expect(list.length).toBe(6);
      expect(list[0].collectionFrequency.schedule).toBe(Schedule.SEMANAL);
      expect(list[1].collectionFrequency.schedule).toBe(Schedule.SEMANAL);

  })

  it('should find all the itemContract that is equals Schedule.SOB_SOLICITACAO ', () =>{
    service.list = ContactListForTests;
    let list = service.getAllItemContractThatHasScheduleType(Schedule.SOB_SOLICITACAO);
    expect(list.length).toBe(3);
    expect(list[0].collectionFrequency.schedule).toBe(Schedule.SOB_SOLICITACAO);

  })

  it('should return contract by status ContractStatus.ATIVO', () => {
    service.list = ContactListForTests;
    let list = service.getAllContractsThatHaveContractStatusType(ContractStatus.ATIVO);
    expect(list.length).toBe(2);
    expect(list[0].contractStatus).toBe(ContractStatus.ATIVO);
    expect(list[1].contractStatus).toBe(ContractStatus.ATIVO);
  })

  it('should return contract by status ContractStatus.RENOVACAO_PENDENTE', () => {
    service.list = ContactListForTests;
    let list = service.getAllContractsThatHaveContractStatusType(ContractStatus.RENOVACAO_PENDENTE);
    expect(list.length).toBe(1);
    expect(list[0].contractStatus).toBe(ContractStatus.RENOVACAO_PENDENTE);

  })

})
