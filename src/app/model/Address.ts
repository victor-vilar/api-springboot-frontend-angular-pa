export interface Address{
  id?:number;
  addressName:string;
  addressNumber:string;
  complement:string;
  zipCode:string;
  city:string;
  state:string;
  requiresCollection:boolean;
  customerId?:string
}
