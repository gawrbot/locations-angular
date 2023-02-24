import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';
import { PlaceListComponent } from './pages/place-list/place-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'places' },
  { path: 'places', pathMatch: 'full', component: PlaceListComponent },
  { path: 'places/:id', pathMatch: 'full', component: PlaceDetailComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
