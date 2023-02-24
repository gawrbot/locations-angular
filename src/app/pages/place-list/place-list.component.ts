import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  templateUrl: './place-list.component.html',
  styleUrls: ['./place-list.component.scss'],
})
export class PlaceListComponent {
  /** TODO: Connect via template */
  protected readonly searchTerm = new FormControl('', { nonNullable: true });
  /** TODO: Connect via template */
  protected readonly onlyVisited = new FormControl(false, {
    nonNullable: true,
  });
}
