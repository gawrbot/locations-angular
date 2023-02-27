# Formunauts Assignment

## Setup and Development

Run `npm i` to install the dependencies.

### Starting the Development web server

Run `npm run start` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

### Starting the fake backend API

This projects includes a fake backend. To start the backend run `npm run backend`. It runs on `http://localhost:3000` and offers the following API endpoints:

- `http://localhost:3000/places` GET
- `http://localhost:3000/places/<id>` GET
- `http://localhost:3000/current_place` POST

This is encapsulated by the [`PlaceApi`](./src/app/shared/api/place.api.ts).

## The Assignment

Your assignment is to build a place check-in. A user can be checked in at only one place at a time. The app contains 2 pages:

- `Place List`: Shows all places
- `Place Details`: Shows the details for a single place

The main focus lies on these topics:

- Understanding Inputs / Outputs in Angular Templates
  https://itnext.io/angular-input-output-f0418ab4cc91
- Understanding Angular Template structural directives, such as `*ngIf` and `*ngFor`
  https://angular.io/guide/built-in-directives#built-in-structural-directives
- Working with Angular Routing
  https://angular.io/guide/router#defining-a-basic-route
- Writing an Angular Component (see `PlaceListItemComponent`)
  https://angular.io/guide/architecture-components#introduction-to-components-and-templates
- Basic understanding of RxJS Observables, Subjects and Operators
  https://angular.io/guide/observables
  https://angular.io/guide/rx-library#operators
  https://rxjs.dev/guide/overview
- Working with Angular Reactive Forms
  https://angular.io/guide/reactive-forms
- Simple state management in `PlaceService` using RxJS
  https://rxjs.dev/guide/scheduler
- How to use styling in Angular
  https://tailwindcss.com/docs/guides/angular

You can:

- FontAwesome if you want to add some icons
- A CSS framework of your choice (tailwind, bootstrap, ...)
- change anything you like if you feel that it is cleaner, better, faster, ...

### Component: Place List Item

Each place list item has the following properties:

- Shows the name of the place
- Shows a small preview image (if available)
- Shows either a "check in" or "check out" button

Use the `place-list-item.component` to display a single item. Check out how to use `@Input` and `@Output` in Angular.

### Page: Place list

URL: `/places`

The place list should contain the following elements:

- A text input field "search" to filter for a place
- A "only visited" toggle that filters for places that were already visited
- A list of place list items

It has the following properties:

- When clicking a place list item, navigate to the corresponding `Place Details`
- When entering text into the search, the filtering should not happen immediately, but rather it should wait 200ms after the last change. Tip: Use `RxJS` for debouncing.

#### Acceptance Criteria

```
WHEN viewing the list without any filter
THEN it should show all places
```

```
WHEN filtering via text input
THEN the list only shows places where the place name contains the search term
```

```
WHEN filtering via toggle "visited"
THEN the list only shows places that were visited.
```

```
WHEN filtering via text input
  AND the "visited" toggle is active
THEN the list only shows places that
```

```
GIVEN that the user is not checked-in at place
WHEN clicking "check in" on a place list item
THEN this button should change to "check out"
  AND every other item should have a "check in" button
```

```
GIVEN that the user is checked-in at place
WHEN clicking "check out" on this place list item
THEN this button should change to "check in"
```

```
GIVEN that the user is checked-in at place
WHEN clicking "check in" on another place list item
THEN this button should change to "check out"
  AND every other item should have a "check in" button
```

### Page: Place Details

URL: `/places/<id>`

This page displays detailed information of a place. It also allows to check-in / check-out at this particular place.

The place detail has the following properties:

- Name of the place
- Image of the place (if available)
- Best result for the place (general and by current user)
- How often the place was visited (in general and by the current user)
- A back button that when clicked navigates back to the place list

#### Acceptance Criteria

```
GIVEN that the user is checked-out at this place
WHEN clicking "check in"
THEN this button should change to "check out"
```

```
GIVEN that the user is checked-in at this place
WHEN clicking "check out"
THEN this button should change to "check in"
```
