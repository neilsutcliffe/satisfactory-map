import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import MarkerList from './MarkerList'
import Coffee from './Coffee'
import styles from './Sidebar.module.scss'
import MarkerDev from './MarkerDev'
import CloseButton from './CloseButton'

@inject('defaultStore')
@observer
class MarkerTypes extends Component {


  render() {

    const { defaultStore } = this.props;
    const { types, userMarkers, markers, visibleMarkers, toggleMarker, toggleDrawer, drawerOpen, nodeInfo, dev } = defaultStore

    const sidebarClass = drawerOpen ? styles.sidebar : styles.sidebarClosed;

    return (
      <>
        <button className={styles.open} onClick={toggleDrawer}>
          <span> Filters
          <span className={styles.count}>
              {visibleMarkers.length} / {markers.length}
            </span>
          </span>
        </button>
        <div className={sidebarClass}>
          <header className={styles.header}>
            <h1>Satisfactory Map</h1>
            <CloseButton toggleDrawer={toggleDrawer} />
          </header>

          <MarkerList types={types} toggleMarker={toggleMarker} />
          <Coffee />
          {dev ? <MarkerDev userMarkers={userMarkers} nodeInfo={nodeInfo} /> : null}
        </div >
      </>
    )
  }
}

export default MarkerTypes;