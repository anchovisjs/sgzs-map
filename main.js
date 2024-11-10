var {DeckGL, GeoJsonLayer, HexagonLayer, _GlobeView, SimpleMeshLayer, H3ClusterLayer} = deck;
var COUNTRIES = './data/AO.geojson'
const EARTH_RADIUS_METERS = 6.3e6;

const getColor = (value) => {
    if (value < 1) {
        return [178, 178, 178];
      } else if (value < 60) {
        return [230, 76, 0];
      } else if (value < 70){
        return [255, 170, 0];
      } else if (value < 75) {
        return [255, 255, 10];
      } else {
        return [56, 168, 0]; 
      }
  };
    
let globe = new deck.SimpleMeshLayer({
    id: 'earth-sphere',
    data: [0],
    mesh: new luma.SphereGeometry({radius: EARTH_RADIUS_METERS, nlat: 18, nlong: 36}),
    coordinateSystem: deck.COORDINATE_SYSTEM.CARTESIAN,
    getPosition: [0, 0, 0],
    getColor: [0, 49, 89]
  });

let countries = new deck.GeoJsonLayer({
    id: 'earth-land-layer2',
    data: COUNTRIES,
    stroked: false,
    filled: true,
    getFillColor: d => getColor(d.properties.CYR_Report),
    opacity: 1,
  });

let mydeckgl = new DeckGL({
  views: new _GlobeView(),
  initialViewState: {
    longitude: 55,
    latitude: 37,
    zoom: 2,
  },
  mapStyle: {
    version: 8,
    sources: {},
    layers: [
      {
        id: 'background',
        type: 'background',
        paint: { 'background-color': '#111' }
      }
    ]
  },
  controller: true, 
  layers: [globe, countries],
});