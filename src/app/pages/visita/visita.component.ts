import { VisitaService } from './../../services/visita/visita.service';
import { Component, AfterViewInit, ViewChild,  } from '@angular/core';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-visita',
  templateUrl: './visita.component.html',
  styleUrls: ['./visita.component.css']
})
export class VisitaComponent implements AfterViewInit {

  date = new Date();
  date1 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
  date2 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0));
  datePipe = new DatePipe("en-US");
  arrayVazio: any = []

  dataUS1: any
  dataUS2: any

  chamados: any[] = []
  chamadosFiltrados: any[] = []

  displayedColumns: string[] = ['cdVisita', 'nmSolicitante', 'dsEmail', 'secretaria', 'dtSolicitacao', 'dtConclusao' ,'action'];

  verificador: boolean = true
  verificadorLinha: boolean = true
  constructor
  (
    private visitaService : VisitaService,
    private router: Router,
    public rotaAtual: ActivatedRoute,
    private dateAdapter: DateAdapter<Date>

  )
  {
    this.onRangeDate()
    // this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  dataSource = new MatTableDataSource<any>();


  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onGetAcessos()
  {
    this.visitaService.getAllVisitas(this.dataUS1, this.dataUS2).subscribe(value => {

      this.refresh()
      this.chamados = value

      this.dataSource.data = this.chamadosFiltrados


      if(this.chamados.length == 0)
      {
        this.verificador = false

      }
      else
      {
        this.ngAfterViewInit()
        this.verificador = true

      }
    })
  }

  onRangeDate()
  {
    this.dataUS1 = this.datePipe.transform(this.date1.value, 'yyyy-MM-dd');
    this.dataUS2 = this.datePipe.transform(this.date2.value, 'yyyy-MM-dd');

    this.refresh()
    this.onGetAcessos()
  }

  onEdit(acesso: any)
  {
    this.router.navigate(['editar-visita'], {relativeTo: this.rotaAtual, state:{data:acesso}})
  }

  refresh() {
    this.visitaService.getAllVisitas(this.dataUS1, this.dataUS2).subscribe((data: any[]) => {
      this.dataSource.data = data;
    })

  }

  applyFilter(filterValue: any) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
}
