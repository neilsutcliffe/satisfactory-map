import React from 'react'
import { Popup } from 'react-leaflet'
import styles from './CustomPopup.module.scss'
import TypeDisplayNames from '../assets/TypeDisplayNames.json'

const MarkerDev = ({ marker, types, setNodeInfo }) => {
  return (
    <>
      <h5>Dev Tools</h5>
      <div className={styles.form}>
        <select value={marker.type} onChange={(e) => { setNodeInfo({ id: marker.id, type: e.target.value }) }}>
          {
            types.map(type => <option key={type.id} value={type.id}>{type.id}</option>)
          }
        </select>
        <input type='text' placeholder='Description' value={marker.description} onBlur={(e) => { setNodeInfo({ id: marker.id, description: e.target.value }) }} />
        <label htmlFor='Underground'>
          <input name='Underground' type='checkbox' value={marker.underground} onChange={(e) => { setNodeInfo({ id: marker.id, underground: e.target.checked }) }} />
          Underground
          </label>
      </div>
    </>
  )
}

const marker = (props) => {
  const { marker, dev } = props

  return (
    <Popup className={styles.container}>
      <h4>{TypeDisplayNames[marker.type]}</h4>

      <div className={styles.content}>
        <h5>Game Engine Co-ordinates</h5>
        <div>
          {marker.id}

        </div>
        <h5>Map Co-ordinates</h5>
        <div>
          {marker.position[0].toFixed(2)}
          <span>,</span>
          {marker.position[1].toFixed(2)}
        </div>
        <h5>Height</h5>
        <div>
          {marker.height === undefined ? "Unknown" : (marker.height / 1000).toFixed(1)}
        </div>


        {dev ? <MarkerDev {...props} /> : null}
      </div>
    </Popup>
  )
}

export default marker;