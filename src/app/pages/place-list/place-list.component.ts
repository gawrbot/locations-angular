import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, Subject } from 'rxjs';
import { IPlace } from 'src/app/shared/models/place.type';
import { PlaceService } from 'src/app/shared/services/place.service';

@Component({
  templateUrl: './place-list.component.html',
})
export class PlaceListComponent implements OnInit {
  places!: IPlace[];
  searchResults: IPlace[] = [];
  checkedInPlace!: IPlace | null;

  /** TODO: Connect via template */
  protected readonly searchTerm = new FormControl('', { nonNullable: true });
  /** TODO: Connect via template */
  protected readonly onlyVisited = new FormControl(false, {
    nonNullable: true,
  });

  constructor(private placeService: PlaceService) {}

  ngOnInit() {
    // Get all places from PLace Service
    this.placeService.loadAllPlaces().subscribe((places: IPlace[]) => {
      this.places = places;
      this.searchResults = places;
    });
    // trigger filter function if search term is entered and wait for 200ms
    this.searchTerm.valueChanges
      .pipe(debounceTime(200))
      .subscribe((searchTerm) => {
        this.searchResults = this.filterPlaces(searchTerm);
      });
    // trigger filter function if toggle is selected and wait for 200ms too
    this.onlyVisited.valueChanges.pipe(debounceTime(200)).subscribe(() => {
      this.searchResults = this.filterPlaces(this.searchTerm.value);
    });
  }

  onCheckInOrOut(place: IPlace) {
    if (this.checkedInPlace && this.checkedInPlace.id === place.id) {
      // User is checking out
      this.checkedInPlace = null;
    } else {
      // User is checking in
      this.checkedInPlace = place;
    }
  }

  private filterPlaces(searchTerm: string): IPlace[] {
    // if no term is entered, check if the toggle is activated. if so, check the visited places, else return all places
    if (!searchTerm) {
      if (this.onlyVisited.value) {
        return this.places.filter((place: IPlace) => place.visits_self > 0);
      } else {
        return this.places;
      }
    }
    // all chars to lower case and then check, if toggle is active. if so, filter for the searchterm AND for visits, else filter only for the search term
    searchTerm = searchTerm.toLowerCase();
    if (this.onlyVisited.value) {
      return this.places.filter(
        (place: IPlace) =>
          place.name.toLowerCase().includes(searchTerm) && place.visits_self > 0
      );
    } else {
      return this.places.filter((place: IPlace) =>
        place.name.toLowerCase().includes(searchTerm)
      );
    }
  }
}
