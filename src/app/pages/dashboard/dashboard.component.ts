import { DashboardService } from './../../services/dashboard/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { type } from 'jquery';
import { Dashboard } from 'src/app/model/dashboard';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  infos: any = {}

  date = new Date();
  date1 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth(), 1));
  date2 = new FormControl(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0));
  datePipe = new DatePipe("en-US");

  dataUS1: any
  dataUS2: any

  constructor
  (
    private dashboardService: DashboardService
  )
  {
  }

  ngOnInit(): void {
    this.onRangeDate()
  }

  getDashboard()
  {
    this.dashboardService.getDashboard(this.dataUS1, this.dataUS2).subscribe(value => {

      this.infos = value

    },
    error => {
      console.error(error)
    })
  }

  onRangeDate()
  {
    this.dataUS1 = this.datePipe.transform(this.date1.value, 'yyyy-MM-dd');
    this.dataUS2 = this.datePipe.transform(this.date2.value, 'yyyy-MM-dd');

    this.getDashboard()
  }

}
