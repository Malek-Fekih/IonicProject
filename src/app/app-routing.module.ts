import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'countries', children: [
      { path: '', loadChildren: () => import('./countries/countries.module').then(m => m.CountriesPageModule) },
    ]

  },
  { path: 'stations', loadChildren: './stations/stations.module#StationsPageModule' },
  { path: 'station-details', loadChildren: './station-details/station-details.module#StationDetailsPageModule' },
  { path: 'favorite', loadChildren: './favorite/favorite.module#FavoritePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
