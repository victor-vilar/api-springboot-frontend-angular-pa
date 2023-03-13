import { ActivatedRoute, Router } from '@angular/router';
import { AddressService } from 'src/app/services/address.service';
import { FormDetail } from 'src/app/model/FormDetail';
import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FullAddressFinderService } from 'src/app/services/find-full-address.service';
import { Address } from 'src/app/model/Address';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Customer } from 'src/app/model/Customer';

@Component({
  selector: 'app-customer-addresses-detail',
  templateUrl: './customer-addresses-detail.component.html',
  styleUrls: ['./customer-addresses-detail.component.css']
})
export class CustomerAddressesDetailComponent implements OnInit, FormDetail {


  @ViewChild('form') form: NgForm;
  idOfEditedItem: string | number;
  crudOperation='Cadastro';
  objectToEdit:Address;
  clientCpfCnpj:string;
  searchedZipCodeErrorResponse:boolean = false;


  constructor(private findFullAddress:FullAddressFinderService,
    private addressService:AddressService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    public dialogRef: MatDialogRef<CustomerAddressesDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }



  ngOnInit(): void {
    this.onLoad();
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.form.setValue({
        zipCode:this.objectToEdit.zipCode,
        addressName: this.objectToEdit.addressName,
        addressNumber :this.objectToEdit.addressNumber,
        complement :this.objectToEdit.complement,
        city : this.objectToEdit.city,
        state : this.objectToEdit.state,
        requiresCollection:this.objectToEdit.requiresCollection
        })
    },100);
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

    if(this.objectToEdit === undefined){
      observable$ = this.addressService.save(address);
    }else{
      address.id = this.objectToEdit.id;
      console.log(address);
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

    this.objectToEdit = this.data.objectToEdit;
    console.log(this.objectToEdit);
    this.clientCpfCnpj = this.data.clientCpfCnpj;

    if(this.objectToEdit !== undefined || this.objectToEdit !== null){
      this.crudOperation="Atualização";
      this.idOfEditedItem = this.objectToEdit.id;

    }
  }

  destroy(): void {
    this.dialogRef.close();
    this.router.navigate(['/clientes'])
  }


  //find the address information
  searchFullAddressInfo(){
    let response = this.findFullAddress.getFullAddress(this.form.value.zipCode);
    response.then(address =>{
      //this.form.reset();
      this.fillFormInputs(address);
      this.searchedZipCodeErrorResponse = false;
    }).catch(error => {
      this.searchedZipCodeErrorResponse = true;
      console.log('Não foi possivel encontrar esse endereço !')
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
