import { ResiduesService } from './../../../../../services/residues.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDetail } from 'src/app/model/FormDetail';
import { ActivatedRoute, Router } from '@angular/router';
import { Residue } from 'src/app/model/Residue';

@Component({
  selector: 'app-residue-detail',
  templateUrl: './residue-detail.component.html',
  styleUrls: ['./residue-detail.component.css']
})
export class ResidueDetailComponent implements OnInit, FormDetail {


  @ViewChild('singInForm') form: NgForm;
  idOfEditedItem: number;
  crudOperation = 'Cadastro';
  constructor(private service:ResiduesService, private activeroute:ActivatedRoute, private router:Router) { }


  createObject():Residue {
    return {
      id:this.idOfEditedItem,
      type:this.form.value.type,
      description:this.form.value.description
    }
  }

  ngOnInit(){
    this.onLoad();
  }

  onLoad(): void {
        //checagem de parametros para entrar ou não no modo de edição do componente
        if(this.activeroute.snapshot.queryParamMap.get('edit')){
          this.crudOperation="Atualização"
          this.activeroute.paramMap.subscribe(value =>{
            this.service.getById(value.get('id'))
            .subscribe(val =>{
              if(val !== null){
                  this.form.setValue({
                    type:val.type,
                    description:val.description,
                  })
                  this.idOfEditedItem = val.id;
              }
            })
          })
      }
  }

  save(): void {

    //criando um novo objeto
    let observable$;
    let residue = this.createObject();
    //se for um objeto com id nulo, é um novo objeto
    //se não é atualização de um objeto existente.
    if(residue.id === undefined){
        observable$ = this.service.save(residue);
    }else{
        observable$ = this.service.update(residue.id,residue);
    }
      observable$.subscribe(this.saveObjectObserver());

  }

  destroy(): void {
    this.router.navigate(['residuos']);
  }

  cleanForm(){
    this.form.reset();
  }

  saveObjectObserver(){
    return{
      next:(response)=>{
        this.service.getAll();
        this.destroy();
      },
      error:(response)=>{
        console.log(response);
      }
    }
  }

}
