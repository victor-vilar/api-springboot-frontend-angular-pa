import { ResiduesService } from './../../../../../services/residues.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormDetail } from 'src/app/model/FormDetail';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-residue-detail',
  templateUrl: './residue-detail.component.html',
  styleUrls: ['./residue-detail.component.css']
})
export class ResidueDetailComponent implements OnInit, FormDetail {


  @ViewChild('singInForm') form: NgForm;
  rota= 'residue';
  idOfEditedItem: number;
  crudOperation = 'Cadastro';
  constructor(private service:ResiduesService, private activeroute:ActivatedRoute, private router:Router) { }

  ngOnInit(){
    this.onLoad();
  }

  onLoad(): void {
        //checagem de parametros para entrar ou não no modo de edição do componente
        if(this.activeroute.snapshot.queryParamMap.get('edit')){
          this.crudOperation="Atualização"
          this.activeroute.paramMap.subscribe(value =>{
            this.service.getById(value.get('id'),this.rota)
            .subscribe(val =>{
              if(val !== null){
                  this.form.setValue({
                    id:'Id: ' + val.id,
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
    let residue = {
      id:this.idOfEditedItem,
      type:this.form.value.type,
      description:this.form.value.description
    }

    //se for um objeto com id nulo, é um novo objeto
    //se não é atualização de um objeto existente.
    if(residue.id === undefined){
        this.service.save(residue,this.rota)
        .subscribe(result => {
        this.service.getAll(this.rota)
        //this.service.sendNull();
        })
    }else{
        this.service.update(residue.id,this.rota,residue)
        .subscribe(result => {
        this.service.getAll(this.rota)
        })
    }

    this.destroy();
  }

  destroy(): void {
    this.router.navigate(['residuos']);
  }

  cleanForm(){
    this.form.reset();
  }

}
