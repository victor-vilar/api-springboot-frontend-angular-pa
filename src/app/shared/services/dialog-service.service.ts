import { ProgressComponent } from '../dialogs/progress/progress.component';
import { SuccessDialogComponent } from '../dialogs/success-dialog/success-dialog.component';
import { ConfirmationDialogComponent } from '../dialogs/confirmation-dialog/confirmation-dialog.component';
import { ErrorDialogComponent } from './../dialogs/error-dialog/error-dialog.component';
import { BlockScrollStrategy } from '@angular/cdk/overlay';
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//serviço utilizado para utililzar o matDialog
export class DialogServiceService {

  //referencia do progress spinner
  public progessSpinnerDialogRef:MatDialogRef<ProgressComponent>;
  constructor(
    //referencia do objeto MatDialog para abrir os formulários dentro de um dialog.
    private dialog:MatDialog,
    private route: ActivatedRoute,
    private router: Router,
  ){}


  //Metodo utilizado para abrir um dialog, passando o componente que deseja utilizar no dialog.
  //@compoent = componente que será aberto no dialog.
  //@ObjectToEdit = objeto que sera passado (caso exista) para o formulário
  //@rota = local para onde será redirecionado após o dialog ser fechado.
  openDialog(component:any, objectToEdit:any, rota:string): void {
    const dialogRef = this.dialog.open(component,{data:{objectToEdit: objectToEdit}});
    this.afterCloseDialog(dialogRef,rota);
  }

  //Metodo utilizdo para abrir um dialog, passando o compoenente que deseja utilizar no dialog passando tambem
  //o id do customer, necessário nos formularios de cadastro de contratos, endereços e fiscais.
  //@compoent = componente que será aberto no dialog.
  //@ObjectToEdit = objeto que sera passado (caso exista) para o formulário
  //@customerId= id do cliente que possui os dados que serão editados
  //@rota = local para onde será redirecionado após o dialog ser fechado.
  openDialogPassingCustomerId(component:any,objectToEdit:any,customerId:string,rota:string):void{
    const dialogRef = this.dialog.open(component,{disableClose: true,data:{
      objectToEdit: objectToEdit,
      clientCpfCnpj:customerId,
    }});

    this.afterCloseDialog(dialogRef,rota);
  }

  openDialogPassingCustomerIdAndReturnCloseObservable(component:any,objectToEdit:any,customerId:string,rota:string):Observable<boolean>{
    const dialogRef = this.dialog.open(component,{disableClose: true,data:{
      objectToEdit: objectToEdit,
      clientCpfCnpj:customerId,
    }});
    return dialogRef.afterClosed();
  }

  //Metodo que será executado após os dialogs serem fechados, redirecionando para alguma rota especifica.
  private afterCloseDialog(dialogRef:MatDialogRef<any>, rota:string){
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([rota], { queryParams: {  }});
    });

  }

  //metodo para realizar alguma ação antes do dialog fechar
  private beforCloseDialog(dialogRef:MatDialogRef<any>, rota:string){
    dialogRef.beforeClosed().subscribe(result => {
      this.router.navigate([rota], { queryParams: {  }});
    })
  }


  //Método para abrir o dialogo de erro.
  //@message = menssagem de erro que será exibida dentro do dialog.
  openErrorDialog(message:string){
    const dialogRef = this.dialog.open(ErrorDialogComponent,{data:{
      error: message,
    }});

    // this.afterCloseDialog(dialogRef,'');
  }

  //returns the dialog after close observable to execute some action
  openConfirmationDialog():Observable<boolean>{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent)
    return dialogRef.afterClosed();
  }

  //open a dialog to confirm the closing of a form without saving its data
  openConfirmCloseDialog(message:string):Observable<boolean>{
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,{data:{text:message}})
    return dialogRef.afterClosed();
  }


  //Método para abrir o dialogo de erro.
  //@message = menssagem de erro que será exibida dentro do dialog.
  //@rota = local para onde será redirecionado apos o fechamento do dialog
  openSucessDialog(message:string,rota:string):void {
    const dialogRef = this.dialog.open(SuccessDialogComponent,{data:{message:message}});
    this.afterCloseDialog(dialogRef,rota);
  }

  openSuccessDialogWithoutRedirect(message:string):void{
    const dialogRef = this.dialog.open(SuccessDialogComponent,{data:{message:message}});
  }

  //Metodo para fechar e limpar a referencia do progress spinner
  closeProgressSpinnerDialog(){

    //se o progessSpinnerDialogRef for diferente de nulo, significa que ele esta aberto
    if(this.progessSpinnerDialogRef != null){

      this.progessSpinnerDialogRef.close();
      this.progessSpinnerDialogRef = null;

    }
  }

  //Metodo para abrir um novo progress spinner
  openProgressDialog(){
    this.progessSpinnerDialogRef = this.dialog.open(ProgressComponent);
  }


}
