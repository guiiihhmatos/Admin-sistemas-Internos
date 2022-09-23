import { ChamadoService } from './../../../services/chamado/chamado.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-chamado',
  templateUrl: './editar-chamado.component.html',
  styleUrls: ['./editar-chamado.component.css']
})
export class EditarChamadoComponent implements OnInit {

  chamadoForm: FormGroup;
  chamadoPassed: any
  secretaria : any[] = []
  verificador: boolean = true
  objetoChamado = {
    'cdChamado': 0,
    'dsConclusao': '',
    'flAberto': ''
  }

  constructor
  (
    private chamadoService: ChamadoService,
    private formBuilder: FormBuilder,
    private location: Location,
    private _snackBar: MatSnackBar
  )
  {

    this.chamadoPassed = history.state.data

    this.chamadoForm = this.formBuilder.group({

      cdChamado: [null, [Validators.required]],
      dsConclusao: [null, [Validators.required]],
      flAberto: [null, [Validators.required]],

    });

    this.chamadoForm.patchValue({

      cdChamado: this.chamadoPassed.cdChamado,
      dsChamado: this.chamadoPassed.dsChamado,
      dsConclusao:this.chamadoPassed.dsConclusao,
      nmSolicitante: this.chamadoPassed.nmSolicitante,
      dsEmail: this.chamadoPassed.dsEmail,
      dsTelefone: this.chamadoPassed.dsTelefone,
      nmSistema: this.chamadoPassed.nmSistema,
      flAberto: this.chamadoPassed.flAberto,
      dtAbertura: this.chamadoPassed.dtAbertura,
      dtConclusao: this.chamadoPassed.dtConclusao,

    });

  }

  ngOnInit(): void {
  }

  onEdit(chamado : any, codigo: number)
  {
    this.objetoChamado.cdChamado = codigo
    this.objetoChamado.dsConclusao = chamado.dsConclusao
    this.objetoChamado.flAberto = chamado.flAberto

    this.chamadoService.putChamados(this.objetoChamado).subscribe(value =>
      this.onSuccess(), error => this.onError()
    )

  }

  onBack()
  {
    this.location.back()
  }

  onSuccess()
  {
    this._snackBar.open("Chamado editado com sucesso", '', {duration: 3000});
    this.onBack();
  }

  private onError()
  {
    this._snackBar.open("Erro ao editar chamado", '', {duration: 3000});
  }
}
