var {DeckGL, GeoJsonLayer, HexagonLayer, _GlobeView, SimpleMeshLayer, H3ClusterLayer} = deck;
var COUNTRIES = 'AO_updated_translated.geojson'
const EARTH_RADIUS_METERS = 6.3e6;

const getColor = (value) => {
    if (value < 0.01) {
        return [178, 178, 178];
      } else if (value < 0.53) {
        return [230, 76, 0];
      } else if (value < 0.61){
        return [255, 170, 0];
      } else if (value < 0.68) {
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
    stroked: true,
    getLineColor: [21, 21, 21],    
    getLineWidth: 0.2,
    lineWidthUnits: 'common',
    pickable: true, 
    autoHighlight: true,
    highlightColor: [61, 61, 61],
    onHover: info => {
      if (info.object) {
        const countryInfo = info.object.properties.CYR_Report;
        console.log(`Hovered Country CYR_Report: ${countryInfo}`);
        document.getElementById('name').innerText = info.object.properties.NAME_RU;
        document.getElementById('counter').innerText = 
          `${ Math.round(countryInfo * 100) / 100}`; 
      } else {
        document.getElementById('counter').innerText = '';
        document.getElementById('counter').innerText = '';
      }
    }
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
