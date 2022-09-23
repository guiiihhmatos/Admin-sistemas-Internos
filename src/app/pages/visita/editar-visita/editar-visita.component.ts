import { VisitaService } from './../../../services/visita/visita.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-editar-visita',
  templateUrl: './editar-visita.component.html',
  styleUrls: ['./editar-visita.component.css']
})
export class EditarVisitaComponent implements OnInit {

  visitaForm: FormGroup;
  visitaPassed: any
  secretaria : any[] = []
  verificador: boolean = true
  objetoVisita = {
    'cdVisita': 0,
    'dsConclusao': '',
    'flAberto': ''
  }

  constructor
  (
    private visitaService: VisitaService,
    private formBuilder: FormBuilder,
    private location: Location,
    private _snackBar: MatSnackBar
  )
  {

    this.visitaPassed = history.state.data

    this.visitaForm = this.formBuilder.group({

      cdChamado: [null, [Validators.required]],
      dsConclusao: [null, [Validators.required]],
      flAberto: [null, [Validators.required]],

    });

    this.visitaForm.patchValue({

      cdChamado: this.visitaPassed.cdChamado,
      dsChamado: this.visitaPassed.dsChamado,
      dsConclusao:this.visitaPassed.dsConclusao,
      nmSolicitante: this.visitaPassed.nmSolicitante,
      dsEmail: this.visitaPassed.dsEmail,
      dsTelefone: this.visitaPassed.dsTelefone,
      nmSistema: this.visitaPassed.nmSistema,
      flAberto: this.visitaPassed.flAberto,
      dtAbertura: this.visitaPassed.dtAbertura,
      dtConclusao: this.visitaPassed.dtConclusao,

    });

  }

  ngOnInit(): void {
  }

  onEdit(visita : any, codigo: number)
  {
    this.objetoVisita.cdVisita = codigo
    this.objetoVisita.dsConclusao = visita.dsConclusao
    this.objetoVisita.flAberto = visita.flAberto

    this.visitaService.putVisitas(this.objetoVisita).subscribe(value =>
      this.onSuccess(), error => this.onError()
    )

  }

  onBack()
  {
    this.location.back()
  }

  onSuccess()
  {
    this._snackBar.open("Visita editado com sucesso", '', {duration: 3000});
    this.onBack();
  }

  private onError()
  {
    this._snackBar.open("Erro ao editar visita", '', {duration: 3000});
  }
}
