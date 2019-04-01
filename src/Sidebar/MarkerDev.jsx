import React, { Component } from 'react'
import { toJS } from 'mobx'
import styles from './Sidebar.module.scss'

const copyToClipboard = (text) => {
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute('value', text);
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}

class MarkerDev extends Component {
  copyUserMarkers = (marker) => {

    const { userMarkers } = this.props

    const js = toJS(userMarkers)
    copyToClipboard(JSON.stringify(js))
  }

  copyCustomNodes = () => {

    const { nodeInfo } = this.props

    const js = toJS(nodeInfo)
    copyToClipboard(JSON.stringify(js))
  }

  render() {
    const { nodeInfo, userMarkers } = this.props

    return (
      <>
        <p className={styles.contributors}>DEV TOOLS</p>
        <button className={styles.json} onClick={this.copyUserMarkers}>Copy User Markers: {userMarkers.length}</button>
        <button className={styles.json} onClick={this.copyCustomNodes}>Copy Custom Info: {Object.keys(nodeInfo).length}</button>
      </>
    )

  }
}

export default MarkerDev;