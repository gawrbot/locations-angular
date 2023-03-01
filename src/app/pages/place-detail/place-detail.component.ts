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

    placeIdFromRoute &&
      this.placeService
        .loadOnePlace(placeIdFromRoute)
        .subscribe((place: IPlace) => {
          this.place = place;
        });

    this.placeService.checkedInPlace$.subscribe((place: IPlace | null) => {
      this.checkedInPlace = place;
    });
  }
  onCheckInOrOut() {
    if (this.checkedInPlace === null) {
      this.placeService.checkIn(this.place);
    } else {
      this.placeService.checkOut(this.checkedInPlace);
    }
  }
}
