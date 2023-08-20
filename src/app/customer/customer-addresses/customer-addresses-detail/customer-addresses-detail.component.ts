import { ActivatedRoute, Router } from '@angular/router';
import { CustomerAddressService } from 'src/app/customer/services/customerAddress.service';
import { FormDetail } from 'src/app/shared/entities/FormDetail';
import { Component, OnInit, ViewChild, Inject, AfterViewInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FullAddressFinderService } from 'src/app/customer/services/find-full-address.service';
import { Address } from 'src/app/shared/entities/Address';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogServiceService } from 'src/app/shared/services/dialog-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-addresses-detail',
  templateUrl: './customer-addresses-detail.component.html',
  styleUrls: ['./customer-addresses-detail.component.css']
})
export class CustomerAddressesDetailComponent implements OnInit,AfterViewInit, FormDetail {


  @ViewChild('form') form: NgForm;
  idOfEditedItem: string | number;
  crudOperation='Cadastro';
  objectToEdit:Address;
  clientCpfCnpj:string;
  searchedZipCodeErrorResponse:boolean = false;
  searchedZipCode="";


  @Input() isSubform:boolean=false;

  constructor(private findFullAddress:FullAddressFinderService,
    private addressService:CustomerAddressService,
    private activatedRoute:ActivatedRoute,
    private router:Router,
    public dialogRef: MatDialogRef<CustomerAddressesDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogService:DialogServiceService,
    private _snackBar: MatSnackBar) { }



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
    this.checkIfHasErros();
    this.dialogService.openProgressDialog();

    let observable$;
    let address = this.createObject();
    address.customerId = this.clientCpfCnpj;

    if(this.objectToEdit === undefined){
      observable$ = this.addressService.save(address);
    }else{
      address.id = this.objectToEdit.id;
      console.log(address);
      observable$ = this.addressService.update(address);
    }

    observable$.subscribe(this.saveAddressObserver());
    this.destroy();
  }

  saveAddressObserver(){
    return {
      next:(response) =>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openSucessDialog('Endereço salvo com sucesso !','/clientes');
        this.addressService.getAll();
      },
      error:(response) =>{
        this.dialogService.closeProgressSpinnerDialog();
        this.dialogService.openErrorDialog('Ocorreu algum erro !');
      }
    }
  }

  onLoad(): void {

    this.clientCpfCnpj = this.data.clientCpfCnpj;

    if(this.data.objectToEdit !== undefined && this.data.objectToEdit !== null){
      this.crudOperation="Atualização";
      this.objectToEdit = this.data.objectToEdit;
    }
  }

  destroy(): void {
    this.dialogRef.close();
  }


  //find the address information
   searchFullAddressInfo(){
    let response =  this.findFullAddress.getFullAddress(this.form.value.zipCode);
    response.then(address =>{

      this.fillFormInputs(address);
      this.searchedZipCodeErrorResponse = false;
      this.searchedZipCode = address.cep;
      this.searchedZipCode = this.searchedZipCode.replace("-","");
      this.openSnackBar("Endereço encontrado com sucesso","Encontrado");

    }).catch(error => {
      this.searchedZipCodeErrorResponse = true;
      this.dialogService.openErrorDialog('Não foi possivel encontrar esse endereço !');
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

  cleanFormFields(){
    this.form.setValue({
      zipCode:'',
      addressName: '',
      addressNumber :'',
      complement :'',
      city : '',
      state : '',
      requiresCollection:false
      })
  }

  checkIfHasErros(){
    let errorMessage;
    if(this.searchedZipCodeErrorResponse || this.searchedZipCode ===""){
      errorMessage ='Não foi possivel encontrar esse endereço, insira um endereço valido !'
      this.dialogService.openErrorDialog(errorMessage);
      this.cleanFormFields();
      throw Error(errorMessage);
    }

    if(this.form.value.zipCode !== this.searchedZipCode){
      errorMessage ='O cep digitado é diferente do cep anteriormente pesquisado'
      this.dialogService.openErrorDialog(errorMessage);
      this.cleanFormFields();
      throw Error(errorMessage);
    }


  }

    //open snackbar angular material
    openSnackBar(message: string, action: string) {
      this._snackBar.open(message, action,{
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        duration: 1000
      });
    }


}
