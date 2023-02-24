import { Injectable } from '@angular/core';
import { PlaceApi } from '../api/place.api';
import { IPlace } from '../models/place.type';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  constructor(private readonly placeApi: PlaceApi) { }
}
