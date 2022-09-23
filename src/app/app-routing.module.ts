import { EditarVisitaComponent } from './pages/visita/editar-visita/editar-visita.component';
import { VisitaComponent } from './pages/visita/visita.component';
import { EditarChamadoComponent } from './pages/chamado/editar-chamado/editar-chamado.component';
import { EditarAcessoComponent } from './pages/acesso/editar-acesso/editar-acesso.component';
import { ChamadoComponent } from './pages/chamado/chamado.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcessoComponent } from './pages/acesso/acesso.component';

const routes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent
  },
  {
    path: 'visita', component: VisitaComponent
  },
  {
    path: 'visita/editar-visita', component: EditarVisitaComponent
  },
  {
    path: 'chamado', component: ChamadoComponent
  },
  {
    path: 'chamado/editar-chamado', component: EditarChamadoComponent
  },
  {
    path: 'acesso', component: AcessoComponent
  },
  {
    path: 'acesso/editar-acesso', component: EditarAcessoComponent
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'dashboard'
  }
];

@NgModule({
  
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
