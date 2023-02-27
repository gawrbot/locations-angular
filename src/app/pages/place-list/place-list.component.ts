import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PlaceApi } from 'src/app/shared/api/place.api';
import { IPlace, IPlaceListResponse } from 'src/app/shared/models/place.type';
import { PlaceService } from 'src/app/shared/services/place.service';

@Component({
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
})
export class PlaceListComponent {
  // /** TODO: Connect via template */
  // protected readonly searchTerm = new FormControl('', { nonNullable: true });
  // /** TODO: Connect via template */
  // protected readonly onlyVisited = new FormControl(false, {
  //   nonNullable: true,
  // });

  places: Observable<IPlaceListResponse>;

  constructor(private http: HttpClient) {
    this.places = this.http.get<IPlaceListResponse>(
      'http://localhost:3000/places'
    );

    console.log(
      'subscription: ',
      this.places.subscribe((x: any) => console.log('x', x))
    );
  }

  // places: Observable<IPlaceListResponse>;
  // constructor(private placeApi: PlaceApi) {
  //   this.places = this.placeApi.list({}).subscribe((res) => console.log(res));
  // }
}
