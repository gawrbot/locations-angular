import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IPlace } from 'src/app/shared/models/place.type';

/**
 * Displays a place as a list item.
 */
@Component({
  selector: 'app-place-list-item',
  templateUrl: './place-list-item.component.html',
})
export class PlaceListItemComponent implements OnInit {
  @Input() place!: IPlace;
  @Input() checkedInPlace!: IPlace | null;
  @Output() setCheckInState = new EventEmitter<IPlace>();

  checkInOut(place: IPlace) {
    this.setCheckInState.emit(place);
  }

  constructor() {}

  ngOnInit() {}
}
