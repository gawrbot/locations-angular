import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { PlaceApi } from '../api/place.api';
import {
  IPlace,
  IPlaceListQuery,
  IPlaceListResponse,
} from '../models/place.type';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  places!: IPlace[];
  constructor(private readonly placeApi: PlaceApi) {}
  private checkInStateSubject = new BehaviorSubject<IPlace | null>(null);

  getCheckInState(): Observable<IPlace | null> {
    return this.checkInStateSubject.asObservable();
  }

  checkIn(place: IPlace) {
    this.placeApi.setCurrentPlace(place.id, { isHere: true }).subscribe();
    this.checkInStateSubject.next(place);
  }

  checkOut(place: IPlace) {
    this.placeApi.setCurrentPlace(place.id, { isHere: false }).subscribe();
    this.checkInStateSubject.next(null);
  }

  loadAllPlaces(): Observable<IPlace[]> {
    const query: IPlaceListQuery = {};
    return this.placeApi.list(query).pipe(
      map((response: IPlaceListResponse) => {
        return response.items;
      })
    );
  }

  loadOnePlace(id: IPlace['id']): Observable<IPlace> {
    return this.placeApi.get(id).pipe(
      map((response: IPlace) => {
        return response;
      })
    );
  }
}
