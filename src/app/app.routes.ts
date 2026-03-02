import { Routes, defaultUrlMatcher } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/items', pathMatch: 'full' },
  {
    path: 'items',
    loadChildren: () =>
      import('./features/items/items.module').then((m) => m.ItemsModule),
  },
  {
    path: '**',
    loadComponent: () =>
      import(
        './shared/components/page-not-found/page-not-found.component'
      ).then((c) => c.PageNotFoundComponent),
  },
];
