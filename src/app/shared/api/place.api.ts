import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  IPlace,
  IPlaceListQuery,
  IPlaceListResponse,
} from '../models/place.type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PlaceApi {
  private readonly baseUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  /**
   * Fetches all places from the server
   */
  list(query: IPlaceListQuery): Observable<IPlaceListResponse> {
    const url = this.getUrl('places');
    let params = new HttpParams();

    if (typeof query.text === 'string') {
      params = params.append('search', query.text);
    }
    if (typeof query.visited === 'boolean') {
      params = params.append('visited', query.visited);
    }

    return this.httpClient.get<IPlaceListResponse>(url, {
      params,
    });
  }

  /**
   * Fetches the place with the given `id` from server.
   * @param id ID of the place to fetch
   */
  get(id: IPlace['id']): Observable<IPlace> {
    const url = this.getUrl('places', id);
    return this.httpClient.get<IPlace>(url);
  }

  /**
   * Sets or unsets the current place.
   *
   * @param id ID of the place to set / unset as current place
   */
  setCurrentPlace(
    id: IPlace['id'],
    options: {
      /**
       * Set to `true` to check in or `false` to check out.
       */
      isHere: boolean;
    }
  ): Observable<IPlace> {
    const url = this.getUrl('current_place');
    return this.httpClient.post<IPlace>(url, {
      place: id,
      is_here: options.isHere,
    });
  }

  private getUrl(...segments: string[]) {
    return [this.baseUrl, ...segments].join('/');
  }
}
