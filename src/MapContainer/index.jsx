import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer, ImageOverlay } from 'react-leaflet'
import { observer, inject } from 'mobx-react';
import L from 'leaflet';
import map from '../assets/map.jpg'
import styles from './MapContainer.module.scss'


const bounds = [[0, 0], [100, 100]];

const getMarker = (marker) => new L.Icon({
  iconUrl: require(`../assets/${marker.type}.svg`),
  iconRetinaUrl: require(`../assets/${marker.type}.svg`),
  iconAnchor: [5, 55],
  popupAnchor: [10, -44],
  iconSize: [25, 55],
  shadowUrl: '../assets/marker-shadow.png',
  shadowSize: [68, 95],
  shadowAnchor: [20, 92],
})

@inject('defaultStore')
@observer
class MapContainer extends Component {

  addMarker = (e) => {
    const { defaultStore } = this.props
    defaultStore.addMarker(e.latlng)
  }

  render() {
    const { defaultStore } = this.props;
    const { markers } = defaultStore;
    const visibleMarkers = markers.filter(marker => marker.enabled);

    return (
      <div className={styles.mapContainer}>
        <Map bounds={bounds} crs={L.CRS.Simple} maxZoom={7} onClick={this.addMarker}>
          <ImageOverlay url={map} bounds={bounds} />
          {
            visibleMarkers.map(marker => {
              return (
                <Marker position={marker.position} icon={getMarker(marker)}>
                  <Popup>{marker.type}</Popup>
                </Marker>
              )
            })
          }
        </Map>
      </div>
    )
  }
}

export default MapContainer