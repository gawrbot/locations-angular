import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaceListItemComponent } from './components/place-list-item/place-list-item.component';
import { PlaceDetailComponent } from './pages/place-detail/place-detail.component';
import { PlaceListComponent } from './pages/place-list/place-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaceListComponent,
    PlaceDetailComponent,
    PlaceListItemComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
