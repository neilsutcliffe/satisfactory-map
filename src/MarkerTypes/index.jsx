import React, { Component } from 'react'
import { observer, inject } from 'mobx-react';
import { toJS } from 'mobx'
import MarkerList from './MarkerList'
import styles from './index.module.scss'

const copyToClipboard = (text) => {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

@inject('defaultStore')
@observer
class MarkerTypes extends Component {

  copyToClipboard = (marker) => {

    const { defaultStore } = this.props
    const { userMarkers } = defaultStore


    const js = toJS(userMarkers)
    console.log(js);
    copyToClipboard(JSON.stringify(js))
  }

  render() {

    const { defaultStore } = this.props;
    const { userMarkers, defaultMarkers, toggleMarker } = defaultStore

    return (
      <div className={styles.markerTypes}>
        <MarkerList markers={defaultMarkers} toggleMarker={toggleMarker} />
        <h4>User</h4>
        <MarkerList markers={userMarkers} toggleMarker={toggleMarker} />
        <button onClick={this.copyToClipboard}>Copy JSON</button>
      </div>
    )
  }
}

export default MarkerTypes;