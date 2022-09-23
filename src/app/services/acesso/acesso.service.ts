import { GeralService } from './../geral/geral.service';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class AcessoService {

  private app_api = new GeralService()

  private apiUrl = this.app_api.api +  "/acesso?inicio="
  private apiId = this.app_api.api + "/acesso"

  constructor
  (
    private httpClient : HttpClient
  ) {}

  getAllAcessos(inicio: any, fim: any) : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.apiUrl + inicio + "&fim=" + fim)
  }

  getOneAcesso(id: number) : Observable<any>
  {
    return this.httpClient.get<any>(this.apiId + id)
  }

  putAcessos(objeto: any): Observable<any>
  {
    return this.httpClient.put<any>(this.apiId, objeto)
  }
}
