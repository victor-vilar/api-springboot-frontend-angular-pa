import { SupervisorService } from './../../../../../../services/supervisor.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FormDetail } from 'src/app/model/FormDetail';
import { Supervisor } from 'src/app/model/Supervisor';

@Component({
  selector: 'app-customer-supervisors-detail',
  templateUrl: './customer-supervisors-detail.component.html',
  styleUrls: ['./customer-supervisors-detail.component.css']
})
export class CustomerSupervisorsDetailComponent implements OnInit, FormDetail {

  constructor(
    private activatedRoute:ActivatedRoute,
    private router:Router,
    private supervisorService:SupervisorService) { }

  @ViewChild('form')form: NgForm;
  idOfEditedItem: string | number;
  crudOperation: string = 'Cadastro';
  supervisorToEdit:Supervisor;
  clientCpfCnpj:string;

  ngOnInit(): void {
    //get the cpf or cnpj from costumer to add a new contract
    this.clientCpfCnpj = this.activatedRoute.parent.snapshot.paramMap.get('cpfCnpj')
    this.onLoad();
  }

  createObject():Supervisor {
    return {
      name:this.form.value.supervisorName,
      phoneNumber:this.form.value.supervisorPhone,
      email:this.form.value.supervisorEmail,
    }
  }

  save(object: any): void {

    let observable$;
    let supervisor = this.createObject();
    supervisor.customerId = this.clientCpfCnpj;

    if(this.supervisorToEdit === undefined){
      observable$ = this.supervisorService.save(supervisor);
    }else{
      supervisor.id = this.supervisorToEdit.id;
      observable$ = this.supervisorService.update(supervisor.id,supervisor);
    }

    observable$.subscribe(this.saveSupervisorObserver());
    this.destroy();
  }

  saveSupervisorObserver(){
    return {
      next:(response) =>{
        this.supervisorService.getAll();
      },
      error:(response) =>{
        console.log(response);
      }
    }
  }

  onLoad(): void {
    //try to get queryParameter edit
    if(this.activatedRoute.snapshot.queryParamMap.get('edit')){
      //change the variable crud Operation to 'atualização' = update
      this.crudOperation="Atualização"
      //observable  get the id param
      this.activatedRoute.paramMap.subscribe(value =>{
        //contract service try to get the contract by id
        this.supervisorService.getById(value.get('id'))
        .subscribe(val =>{
          //if value != null the form will be filled by val values
          if(val !== null){
            this.form.setValue({
              supervisorName:val.name,
              supervisorPhone: val.phoneNumber,
              supervisorEmail:val.email,
              })
              this.supervisorToEdit = val;
          }
        })
      })
    }
  }

  destroy(): void {
    this.router.navigate(['/clientes'])
  }

  cleanForm(){
    this.form.reset();
  }

}
