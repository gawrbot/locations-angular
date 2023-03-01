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
  private checkedInPlaceSubject = new BehaviorSubject<IPlace | null>(null);
  checkedInPlace$ = this.checkedInPlaceSubject.asObservable();

  setCheckedInPlace(place: IPlace) {
    this.checkedInPlaceSubject.next(place);
  }

  clearCheckedInPlace() {
    this.checkedInPlaceSubject.next(null);
  }

  getCheckedInPlace(): IPlace | null {
    return this.checkedInPlaceSubject.value;
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

  checkIn(place: IPlace) {
    // Check out the current place first, if there is one
    const currentCheckedInPlace = this.getCheckedInPlace();
    if (currentCheckedInPlace) {
      this.checkOut(currentCheckedInPlace);
    }
    // Check in the new place
    this.placeApi
      .setCurrentPlace(place.id, { isHere: true })
      .subscribe((checkedInPlace: IPlace) => {
        this.setCheckedInPlace(checkedInPlace);
      });
  }

  checkOut(place: IPlace) {
    this.placeApi.setCurrentPlace(place.id, { isHere: false }).subscribe(() => {
      this.clearCheckedInPlace();
    });
  }
}
