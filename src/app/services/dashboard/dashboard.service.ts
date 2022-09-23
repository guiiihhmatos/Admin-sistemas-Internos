import { Dashboard } from './../../model/dashboard';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GeralService } from '../geral/geral.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private app_api = new GeralService()

  private apiUrl = this.app_api.api + "/dashboard?inicio="

  constructor
  (
    private httpClient: HttpClient
  )
  {

  }

  getDashboard(inicio: any, fim: any) : Observable<Dashboard[]>
  {
    return this.httpClient.get<Dashboard[]>(this.apiUrl + inicio + "&fim=" + fim)
  }
}
