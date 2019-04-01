import React, { Component } from 'react'
import { Map, Circle, ImageOverlay, Marker } from 'react-leaflet'
import { observer, inject } from 'mobx-react';
import L from 'leaflet';
import map from '../assets/map-liquified.jpg'
import styles from './MapContainer.module.scss'
import CustomPopup from '../CustomPopup/CustomPopup'
import './leaflet.scss'


const boundsSmall = L.latLngBounds(L.latLng(0, 0), L.latLng(100, 100));
const boundsMiddle = L.latLngBounds(L.latLng(12, 12), L.latLng(100 - 12, 100 - 12));

const CustomMarker = (props) => {
  const { marker, removeMarker } = props;

  let icon = null;

  if (marker.type.startsWith('slug-')) {
    icon = new L.Icon({
      iconUrl: require(`../assets/${marker.type}.svg`),
      iconAnchor: [12, 15],
      popupAnchor: [1, -40],
      iconSize: [25, 15],
    })

  }
  else {
    icon = new L.Icon({
      iconUrl: require(`../assets/${marker.type}.svg`),
      iconAnchor: [15, 35],
      popupAnchor: [1, -40],
      iconSize: [40, 35],
    })
  }

  const opacity = marker.underground ? 0.3 : 1;



  return (
    <Marker position={marker.position} icon={icon} opacity={opacity} onClick={() => removeMarker(marker)}>
      <CustomPopup {...props} />
    </Marker>
  )
}


@inject('defaultStore')
@observer
class MapContainer extends Component {

  addMarker = (e) => {
    const { defaultStore } = this.props
    defaultStore.addMarker(e.latlng)
  }

  render() {
    const { defaultStore } = this.props;
    const { setNodeInfo, visibleMarkers, types, removeMarker, dev } = defaultStore;

    return (
      <div className={styles.mapContainer}>
        <Map className={styles.map} bounds={boundsMiddle} crs={L.CRS.Simple} minZoom={2} maxZoom={7} onClick={this.addMarker}>
          <ImageOverlay url={map} bounds={boundsSmall} />
          <Circle center={[68, 47.5]} radius={3} opacity={0.5} />
          <Circle center={[26.1875, 34]} radius={3} opacity={0.5} />
          <Circle center={[60.59375, 12]} radius={3} opacity={0.5} />

          {
            visibleMarkers.map(marker => <CustomMarker key={marker.id} marker={marker} types={types} setNodeInfo={setNodeInfo} removeMarker={removeMarker} dev={dev} />)
          }
        </Map>
      </div>
    )
  }
}

export default MapContainer