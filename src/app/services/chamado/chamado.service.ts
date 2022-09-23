import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeralService } from '../geral/geral.service';

@Injectable({
  providedIn: 'root'
})
export class ChamadoService {

  private app_api = new GeralService()

  private apiUrl = this.app_api.api +  "/chamado?inicio="
  private apiId = this.app_api.api + "/chamado"

  constructor(private httpClient: HttpClient) { }

  getAllChamados(inicio: any, fim: any): Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.apiUrl + inicio + "&fim=" + fim)
  }

  putChamados(objeto: any): Observable<any>
  {
    return this.httpClient.put<any>(this.apiId, objeto)
  }

}
