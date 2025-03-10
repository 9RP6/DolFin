import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { GuestComponent } from './theme/layout/guest/guest.component';
import { RiskProfileComponent } from './demo/pages/risk-profile/risk-profile.component';
import { EquityComponent } from './demo/pages/asset-classes/equity/equity.component';
import { BondsComponent } from './demo/pages/asset-classes/bonds/bonds.component';
import { AlternativesComponent } from './demo/pages/asset-classes/alternatives/alternatives.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: '/default',
        pathMatch: 'full'
      },
      {
        path: 'default',
        loadComponent: () => import('./demo/dashboard/default/default.component').then((c) => c.DefaultComponent)
      },
      {
        path: 'typography',
        loadComponent: () => import('./demo/elements/typography/typography.component')
      },
      {
        path: 'color',
        loadComponent: () => import('./demo/elements/element-color/element-color.component')
      },
      {
        path: 'sample-page',
        loadComponent: () => import('./demo/other/sample-page/sample-page.component')
      },
      {
        path: 'risk-profile', 
        loadComponent: () => import('./demo/pages/risk-profile/risk-profile.component').then((c) => c.RiskProfileComponent)
      },
      {
        path: 'asset-classes/equity', 
        loadComponent: () => import('./demo/pages/asset-classes/equity/equity.component').then((c) => c.EquityComponent)
      },
      {
        path: 'asset-classes/bonds', 
        component: BondsComponent
      },
      {
        path: 'asset-classes/alternatives', 
        component: AlternativesComponent
      },
    ]
  },
  {
    path: '',
    component: GuestComponent,
    children: [
      {
        path: 'guest',
        loadChildren: () => import('./demo/pages/authentication/authentication.module').then((m) => m.AuthenticationModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}