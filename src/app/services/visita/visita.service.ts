import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class VisitaService {

  private apiUrl = "https://desis.saovicente.sp.gov.br/api/visita?inicio="
  private apiId = "https://desis.saovicente.sp.gov.br/api/visita"
  constructor(private httpClient: HttpClient) { }

  getAllVisitas(inicio: any, fim: any): Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.apiUrl + inicio + "&fim=" + fim)
  }

  putVisitas(objeto: any): Observable<any>
  {
    return this.httpClient.put<any>(this.apiId, objeto)
  }
}
