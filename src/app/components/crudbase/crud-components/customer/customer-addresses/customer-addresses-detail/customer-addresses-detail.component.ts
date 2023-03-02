import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { FormDetail } from 'src/app/model/FormDetail';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FullAddressFinderService } from 'src/app/services/find-full-address.service';
import { Address } from 'src/app/model/Address';

@Component({
  selector: 'app-customer-addresses-detail',
  templateUrl: './customer-addresses-detail.component.html',
  styleUrls: ['./customer-addresses-detail.component.css']
})
export class CustomerAddressesDetailComponent implements OnInit, FormDetail {


  @ViewChild('form') form: NgForm;
  idOfEditedItem: string | number;
  crudOperation='Cadastro';
  addressToEdit:Address;
  clientCpfCnpj:string;

  constructor(private findFullAddress:FullAddressFinderService,
    private addressService:AddressService,
    private activatedRoute:ActivatedRoute,
    private router:Router,) { }



  ngOnInit(): void {

    //get the cpf or cnpj from costumer to add a new contract
    this.clientCpfCnpj =this.activatedRoute.parent.snapshot.paramMap.get('cpfCnpj')
    this.onLoad();

  }


  createObject():Address {

    return {
      addressName:this.form.value.addressName,
      addressNumber:this.form.value.addressNumber,
      complement:this.form.value.complement,
      zipCode:this.form.value.zipCode,
      city:this.form.value.city,
      state:this.form.value.state,
      requiresCollection:this.form.value.requiresCollection,
      customerId:this.clientCpfCnpj,
    }
  }

  save(object: any): void {

    let observable$;
    let address = this.createObject();
    address.customerId = this.clientCpfCnpj;

    if(this.addressToEdit === undefined){
      observable$ = this.addressService.save(address);
    }else{
      address.id = this.addressToEdit.id;
      observable$ = this.addressService.update(address.id,address);
    }

    observable$.subscribe(this.saveAddressObserver());
    this.destroy();
  }

  saveAddressObserver(){
    return {
      next:(response) =>{
        console.log(response);
        this.addressService.getAll();
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
              this.addressService.getById(value.get('id'))
              .subscribe(val =>{
                //if value != null the form will be filled by val values
                if(val !== null){
                  this.form.setValue({
                    zipCode:val.zipCode,
                    addressName: val.addressName,
                    addressNumber :val.addressNumber,
                    complement :val.complement,
                    city : val.city,
                    state : val.state,
                    requiresCollection:val.requiresCollection
                    })
                    this.addressToEdit = val;
                }
              })
            })
          }
  }

  destroy(): void {
    this.router.navigate(['/clientes'])
  }


  //find the address information
  searchFullAddressInfo(){
    let response = this.findFullAddress.getFullAddress(this.form.value.zipCode);
    response.then(address =>{
      this.fillFormInputs(address);
    })
  }

  fillFormInputs(address:any){
    this.form.setValue({
    zipCode:this.form.value.zipCode,
    addressName: address.logradouro,
    addressNumber :'',
    complement :'',
    city : address.localidade,
    state : address.uf,
    requiresCollection:this.form.value.requiresCollection
    })
  }

}
