import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginRequiredGuard } from '../guards/login-required.guard';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: 'pages',
    component: PagesComponent,
    canActivate: [LoginRequiredGuard],
    loadChildren: () =>
      import('./child-routes.module').then((m) => m.ChildRoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
