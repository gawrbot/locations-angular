const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const jsonParser = bodyParser.json();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

const places = new Map();
let placeId = -1;
let currentPlaceId = null;
function addPlace(place) {
  places.set(`place-${++placeId}`, place);
}

function visitPlace(id) {
  const place = places.get(id);

  place.visits_self += 1;
  place.visits_overall += 1;
  currentPlaceId = id;

  return place;
}

function mapPlaceFoResponse(id, place) {
  return {
    ...place,
    id,
  };
}

app.get("/places", (req, res, next) => {
  const { search, visited } = req.query;
  const items = [];

  for (const [id, place] of places.entries()) {
    // Filter visited
    if (
      (visited === "true" && place.visits_self === 0) ||
      (visited === "false" && place.visits_self > 0)
    ) {
      continue;
    }

    // Filter search
    if (
      typeof search === "string" &&
      search.length > 0 &&
      place.name.toLowerCase().indexOf(search.toLowerCase()) < 0
    ) {
      continue;
    }

    items.push(mapPlaceFoResponse(id, place));
  }

  res.send({
    total: items.length,
    items,
  });
});

app.get("/places/:id", (req, res) => {
  const id = req.params.id;
  const place = places.get(id);
  if (!place) {
    res.status(404).send({ error: `Place with id ${id} does not exist.` });
    return;
  }

  res.send(mapPlaceFoResponse(id, place));
});

app.post("/current_place", jsonParser, (req, res) => {
  const { place: id, is_here } = req.body;
  if (!places.has(id)) {
    res.status(404).send({ error: `Place with id ${id} does not exist.` });
    return;
  }

  let place;
  if (is_here === true) {
    place = visitPlace(id);
  } else {
    if (currentPlaceId !== id) {
      res.status(400).send({
        error: `Can't check out from place ${id} because you're not checked in.`,
      });
      return;
    }

    place = places.get(id);
    currentPlaceId = null;
  }
  res.send(mapPlaceFoResponse(id, place));
});

// Server setup
app.listen(3000, () => {
  console.log("Server is Running");
});

// --------------------------------------------------------------------------------
// Add some places
// --------------------------------------------------------------------------------
addPlace({
  name: "Heldenplatz",
  image_url:
    "https://www.denkmalwien.at/sites/default/files/gallery_pix_now/Gallery-Now-Heldenplatz-Rundgang-Wir-sind-HeldInnen-denk-mal-wien-02.jpg",
  best_result_self: null,
  best_result_overall: 22,
  visits_self: 0,
  visits_overall: 130,
});

addPlace({
  name: "Westbahnhof",
  image_url: null,
  // image_url:
  //   "https://thumbs.vienna.at/?url=https://www.vienna.at/2012/09/westbahnhof-e1347610632131.jpg&w=1576&h=1182&crop=1",
  best_result_self: 30,
  best_result_overall: 62,
  visits_self: 6,
  visits_overall: 202,
});

addPlace({
  name: "Hannah-Arendt-Park",
  image_url:
    "https://architektur.hoerbst.com/wp-content/uploads/2019/10/049_quartier-am-hannah-arendt-park_seestadt-aspern_staatspreis-architektur-nachhaltigkeit-2019_by_kurt-hoerbst_132532.jpg",
  best_result_self: 99,
  best_result_overall: 99,
  visits_self: 5,
  visits_overall: 63,
});

addPlace({
  name: "Karl-Marx-Hof",
  image_url: "https://c2.staticflickr.com/6/5589/15110607117_855622ef98_b.jpg",
  best_result_self: 17,
  best_result_overall: 27,
  visits_self: 2,
  visits_overall: 19,
});

addPlace({
  name: "Friedrich-Engels-Platz",
  image_url:
    "https://img.fotocommunity.com/wiener-gemeindebauten-friedrich-engels-platz-hof-bild-1-1a9381d4-b010-4b59-805b-5cb3775d0c90.jpg?height=1080",
  best_result_self: 30,
  best_result_overall: 100,
  visits_self: 13,
  visits_overall: 70,
});

addPlace({
  name: "MuseumsQuartier",
  image_url:
    "https://www.falstaff.at/fileadmin/_processed_/5/e/csm_MQ-Museumsquartier-Wien-c-Hertha-Hurnaus-2640_c8984dda04.jpg",
  best_result_self: 30,
  best_result_overall: 76,
  visits_self: 9,
  visits_overall: 101,
});

addPlace({
  name: "Augarten",
  image_url:
    "https://get.wallhere.com/photo/Vienna-wien-park-herbst-augarten-736205.jpg",
  best_result_self: 15,
  best_result_overall: 19,
  visits_self: 1,
  visits_overall: 45,
});

addPlace({
  name: "Sternwartepark",
  image_url:
    "https://www.coffeelifestyler.com/wp-content/uploads/2021/06/Sternwartepark-scaled.jpg",
  best_result_self: 50,
  best_result_overall: 50,
  visits_self: 3,
  visits_overall: 10,
});
