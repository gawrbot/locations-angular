import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPlace } from 'src/app/shared/models/place.type';
import { PlaceService } from 'src/app/shared/services/place.service';

@Component({
  templateUrl: './place-detail.component.html',
})
export class PlaceDetailComponent implements OnInit {
  place!: IPlace;
  checkedInPlace!: IPlace | null;

  constructor(
    private placeService: PlaceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const placeIdFromRoute = routeParams.get('id');

    // get route id
    placeIdFromRoute &&
      this.placeService
        .loadOnePlace(placeIdFromRoute)
        .subscribe((place: IPlace) => {
          this.place = place;
        });

    this.placeService.getCheckInState().subscribe((value) => {
      this.checkedInPlace = value;
    });
  }

  onCheckInOrOut(place: IPlace) {
    if (this.checkedInPlace?.id === place.id) {
      // check out
      this.placeService.checkOut(place);
      console.log('checked out from', place.name);
    } else {
      // check in
      this.placeService.checkIn(place);
      console.log('checked in to', this.checkedInPlace?.name);
    }
  }
}
