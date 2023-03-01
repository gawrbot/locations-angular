import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { IPlace } from 'src/app/shared/models/place.type';

/**
 * Displays a place as a list item.
 */
@Component({
  selector: 'app-place-list-item',
  templateUrl: './place-list-item.component.html',
})
export class PlaceListItemComponent implements OnChanges {
  @Input() place!: IPlace;
  @Input() checkedInPlace!: IPlace | null;
  @Output() checkInOrOut = new EventEmitter<boolean>();
  isPlaceCheckedIn = false;

  ngOnChanges(changes: SimpleChanges): void {
    if ('checkedInPlace' in changes) {
      this.isPlaceCheckedIn = this.checkedInPlace?.id === this.place.id;
    }
  }

  onCheckInOrOut() {
    this.checkInOrOut.emit();
  }
}
