import { CustomerService } from './../../../../../services/customer.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDetail } from 'src/app/model/FormDetail';
import { ActivatedRoute, Router } from '@angular/router';

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

  mountObject(){
    let object = {
      cpfCnpj:this.form.value.cpfCnpj,
      nameCompanyName:this.form.value.razaoSocial,
    }
    return object;

  }

  save(): void {
    console.log(this.idOfEditedItem);
    let customer = this.mountObject();
    //se for um objeto com id nulo, é um novo objeto
    //se não é atualização de um objeto existente.
    if(this.idOfEditedItem === undefined){
    this.service.save(customer,this.rota)
    .subscribe(result => {
     this.service.getAll(this.rota)
      //this.service.sendNull();
    })
    }else{
    this.service.update(customer.cpfCnpj,this.rota,customer)
    .subscribe(result => {
      this.service.getAll(this.rota)
     })
    }
    this.destroy();
  }

  onLoad(): void {
    if(this.activeroute.snapshot.queryParamMap.get('edit')){
      this.crudOperation="Atualização"
      this.activeroute.paramMap.subscribe(value =>{
        this.service.getById(value.get('id'),this.rota)
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

}