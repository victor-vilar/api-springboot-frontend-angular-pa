import { CustomerService } from './../../../../../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDetail } from 'src/app/model/FormDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit, FormDetail {

  constructor(private service:CustomerService, private activeroute:ActivatedRoute, private router:Router) { }

  @ViewChild('singInForm')form: NgForm;
  rota: string = 'customer';
  idOfEditedItem: number | string;
  crudOperation: string = "Cadastrar";

  ngOnInit(): void {
    this.onLoad();
  }

  createObject():Customer{
    return {
      cpfCnpj:this.form.value.cpfCnpj,
      nameCompanyName:this.form.value.razaoSocial,
    }

  }

  save(): void {

    let customer = this.createObject();
    let obervable$;

    if(this.idOfEditedItem === undefined){
      obervable$ =this.service.save(customer);
    }else{
      obervable$ =this.service.update(customer.cpfCnpj,customer)
    }

    obervable$.subscribe(this.customerObserver());
    this.destroy();
  }

  onLoad(): void {
    if(this.activeroute.snapshot.queryParamMap.get('edit')){
      this.crudOperation="Atualização"
      this.activeroute.paramMap.subscribe(value =>{
        this.service.getById(value.get('id'))
        .subscribe(val =>{
          if(val !== null){
              this.form.setValue({
                cpfCnpj:val.cpfCnpj,
                razaoSocial:val.nameCompanyName,
              })
              this.idOfEditedItem = val.cpfCnpj;
          }
        })
      })
    }

  }
  destroy(): void {
    this.router.navigate(['clientes']);
  }

  cleanForm(){
    this.form.reset();
  }

  customerObserver(){
    return{
      next:(response)=>{
        console.log(response);
        this.service.getAll();
      },
      error:(response)=>{
        console.log(response)
      }
    }
  }
}
