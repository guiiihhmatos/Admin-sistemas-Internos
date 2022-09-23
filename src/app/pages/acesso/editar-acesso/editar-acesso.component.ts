import { AcessoService } from './../../../services/acesso/acesso.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-acesso',
  templateUrl: './editar-acesso.component.html',
  styleUrls: ['./editar-acesso.component.css']
})
export class EditarAcessoComponent implements OnInit {

  acessoForm: FormGroup;
  acessoPassed: any
  secretaria : any[] = []
  verificador: boolean = true
  objetoAcesso = {
    'cdAcesso': 0,
    'dsConclusao': '',
    'flAberto': ''
  }

  constructor
  (
    private acessoService: AcessoService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private location: Location
  )
  {

    this.acessoPassed = history.state.data

    this.acessoForm = this.formBuilder.group({

      cdAcesso: [null, [Validators.required]],
      dsConclusao: [null, [Validators.required]],
      flAberto: [null, [Validators.required]],

    });

    this.acessoForm.patchValue({

      cdAcesso: this.acessoPassed.cdAcesso,
      dsConclusao: this.acessoPassed.dsConclusao,
      nmServidor:this.acessoPassed.nmServidor,
      cdServidor: this.acessoPassed.cdServidor,
      dsCargo: this.acessoPassed.dsCargo,
      dsEmail: this.acessoPassed.dsEmail,
      dsEquivalente: this.acessoPassed.dsEquivalente,
      nmRequisitante: this.acessoPassed.nmRequisitante,
      dtPedido: this.acessoPassed.dtPedido,
      dtConclusao: this.acessoPassed.dtConclusao,
      flAberto: this.acessoPassed.flAberto,
      dsSistema: this.acessoPassed.dsSistema,
      secretaria: this.acessoPassed.secretaria.dsSecretaria,

    });

  }

  ngOnInit(): void {
  }

  onEdit(acesso : any, codigo: number)
  {
    this.objetoAcesso.cdAcesso = codigo
    this.objetoAcesso.dsConclusao = acesso.dsConclusao
    this.objetoAcesso.flAberto = acesso.flAberto

    this.acessoService.putAcessos(this.objetoAcesso).subscribe(value =>
      this.onSuccess(), error => this.onError()
    )

  }

  onDescSistema()
  {
    if(this.verificador == true)
    {
      this.verificador = false
    }
    else
    {
      this.verificador = true
    }
  }

  onBack()
  {
    this.location.back()
  }

  onSuccess()
  {
    this._snackBar.open("Acesso editado com sucesso", '', {duration: 3000});
    this.onBack();
  }

  private onError()
  {
    this._snackBar.open("Erro ao editar acesso", '', {duration: 3000});
  }
}
