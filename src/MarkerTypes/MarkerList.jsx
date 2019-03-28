import React, { Component } from 'react'
import { observer } from 'mobx-react';
import styles from './index.module.scss'

@observer
class MarkerTypes extends Component {
  render() {

    const { markers, toggleMarker } = this.props;

    return (
      <div className={styles.markerList}>
        <ul>
          {
            markers.map((marker) => (
              <li key={marker.type}
                onClick={() => toggleMarker(marker.type)}>
                {marker.type}
                <br />
                {marker.enabled ? "enabled" : "hidden"}
              </li>
            )
            )
          }
        </ul>
      </div>
    )
  }
}

export default MarkerTypes;