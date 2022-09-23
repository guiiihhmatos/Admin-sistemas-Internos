import { AcessoService } from './../../services/acesso/acesso.service';
import { Component, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-acesso',
  templateUrl: './acesso.component.html',
  styleUrls: ['./acesso.component.css']
})
export class AcessoComponent implements AfterViewInit {

  date = new Date();
  date1 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
  date2 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0));
  datePipe = new DatePipe("en-US");

  dataUS1: any
  dataUS2: any

  acessos: any[] = []
  acessosFIltrados: any[] = []
  arrayVazio: [] = []

  displayedColumns: string[] = ['cdAcesso', 'nmServidor', 'dsCargo', 'dsSecretaria','nmRequisitante', 'dtPedido', 'dtConclusao' ,'action'];

  verificador: boolean = true
  filtroAberto: any = ""

  dataSourceFiltro = new MatTableDataSource<any>();

  constructor
  (
    private AcessoService : AcessoService,
    private router: Router,
    public rotaAtual: ActivatedRoute

  )
  {
    this.onRangeDate()
  }

  dataSource = new MatTableDataSource<any>();


  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceFiltro.paginator = this.paginator;
  }

  onGetAcessos(dataUS1 : string, dataUS2 : string)
  {
    for(let i = 1; i <= 2; i++) //for criado por conta do problema na hora de buscar a data e associar no datatable, quando ele da dois cliques funciona. Então criei um for para cada clique virar um duplo clique
    {

      this.AcessoService.getAllAcessos(dataUS1, dataUS2).subscribe(value => {

        this.refresh()
        this.acessos = value


        this.dataSource.data = this.acessos

        if(this.acessos.length == 0)
        {
          this.verificador = false
        }
        else
        {
          this.ngAfterViewInit()
          this.verificador = true
        }
      })

      this.dataSource.paginator = this.paginator;
      this.dataSourceFiltro.paginator = this.paginator;

    }

  }

  onRangeDate()
  {
    this.dataUS1 = this.datePipe.transform(this.date1.value, 'yyyy-MM-dd');
    this.dataUS2 = this.datePipe.transform(this.date2.value, 'yyyy-MM-dd');

    this.onGetAcessos(this.dataUS1, this.dataUS2)
  }

  onEdit(acesso: any)
  {
    this.router.navigate(['editar-acesso'], {relativeTo: this.rotaAtual, state:{data:acesso}})
  }

  refresh() {
    this.AcessoService.getAllAcessos(this.dataUS1, this.dataUS2).subscribe((data: any[]) => {
      this.dataSource.data = data;
    })

  }

  applyFilter(filterValue: any) {

    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }


}


