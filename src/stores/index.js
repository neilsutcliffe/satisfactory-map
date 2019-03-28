import { observable, action, computed } from 'mobx';

const startingData =
  [
    { "type": "node-copper-impure", "position": [14.8203125, 31.6171875], "enabled": true },
    { "type": "node-copper-impure", "position": [14.2578125, 31.8046875], "enabled": true }
  ]

class DefaultStore {
  @observable defaultMarkers = [];

  @observable userMarkers = [];

  constructor() {

    startingData.forEach(data => this.defaultMarkers.push(data))
    // Add each todo the the list
  }

  @computed get markers() {
    return this.defaultMarkers.concat(this.userMarkers);
  }

  @action addMarker = (latLng) => {
    const newMarker = { type: 'user', position: [latLng.lat, latLng.lng], enabled: true }

    this.userMarkers.push(newMarker)
  }

  @action toggleMarker = (type) => {
    const matching = this.defaultMarkers.filter(marker => marker.type === type)

    if (matching.length > 0) {
      const match = matching[0]
      match.enabled = !match.enabled
    }
  }

}

export default DefaultStore;
