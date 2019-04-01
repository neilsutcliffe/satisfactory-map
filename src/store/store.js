import { observable, action, computed } from 'mobx';

// This is all mining nodes
import StartingFilter from './StartingFilter.json'
import RawSlugsPurple from './RawSlugsPurple.json'
import RawSlugsGreen from './RawSlugsGreen.json'
import RawSlugsYellow from './RawSlugsYellow.json'
import RawGeysers from './RawGeysers.json'
import RawNodes from './RawNodes.json'
import RawCrash from './RawCrash.json'
import Types from './Types.json'

import NodeInfo from './NodeInfo.json'

const convertFromDataMined = (data, type) => {
  // Magic numbers to line up with the map
  const offsetNORTH = 55.8
  const offsetRIGHT = 40.8
  const ratioNORTH = 7700;
  const ratioRIGHT = 7700

  const position = [offsetNORTH - (Number(data.South) / ratioNORTH), (Number(data.East) / ratioRIGHT) + offsetRIGHT];

  // Original ID based off game position data
  const originalID = `${data.South.toFixed()},${data.East.toFixed()}`

  return { position, type: type.toLowerCase(), id: originalID, height: data.Height }
}

const compare = (a, b) => {
  if (a.id < b.id)
    return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}

const checkDictionary = (item, dictionary) => {
  if (dictionary[item.id] === undefined) return item;

  const match = dictionary[item.id];

  const extra = { underground: match.underground !== undefined ? match.underground : false }

  const result = Object.assign({}, item, extra, match)
  return result
}

class Store {
  @observable defaultMarkers = []

  @observable userMarkers = []

  @observable visibleTypes = StartingFilter.starting

  @observable nodeInfo = {}

  @observable drawerOpen = true;

  @observable dev = false;

  id = 0;

  constructor() {
    const items = [];

    RawNodes.forEach(data => items.push(convertFromDataMined(data, 'unknown')))
    RawCrash.forEach(data => items.push(convertFromDataMined(data, 'crash')))
    RawSlugsGreen.forEach(data => items.push(convertFromDataMined(data, 'slug-green')))
    RawSlugsYellow.forEach(data => items.push(convertFromDataMined(data, 'slug-yellow')))
    RawSlugsPurple.forEach(data => items.push(convertFromDataMined(data, 'slug-purple')))
    RawGeysers.forEach(data => items.push(convertFromDataMined(data, 'geyser')))

    this.defaultMarkers.replace(items.map(x => checkDictionary(x, NodeInfo)))

    this.dev = window.location.search !== "";

  }

  @computed get types() {
    return Types.types.map(type => { return { id: type, enabled: this.visibleTypes.indexOf(type) !== -1 } })
      .sort(compare)
      .filter(type => type.id !== 'user')
  }

  // Adds the information to the dictionary. This is for stuff not in the raw info
  @action setNodeInfo = (newInfo) => {
    const existing = this.nodeInfo[newInfo.id]

    if (existing !== undefined) {
      this.nodeInfo[newInfo.id] = Object.assign({}, existing, newInfo)
    }
    else {
      this.nodeInfo[newInfo.id] = newInfo
    }
  }

  @computed get markers() {
    const allMarkers = this.defaultMarkers.concat(this.userMarkers);

    return allMarkers.map(x => checkDictionary(x, this.nodeInfo))
  }

  @computed get visibleMarkers() {
    return this.markers.filter(x => this.visibleTypes.indexOf(x.type) !== -1)
  }

  @action addMarker = (latLng) => {
    const newMarker = { type: 'user', id: this.id += 1, position: [latLng.lat, latLng.lng], enabled: true }

    this.userMarkers.push(newMarker)
  }

  @action removeMarker = (marker) => {
    if (marker.type === "user") {
      this.userMarkers.replace(this.userMarkers.filter(x => x.position !== marker.position))
    }
  }

  @action toggleDrawer = () => {
    this.drawerOpen = !this.drawerOpen;
  }

  @action toggleMarker = (type) => {
    const currently = this.visibleTypes.indexOf(type);
    if (currently === -1) this.visibleTypes.push(type);
    else this.visibleTypes.remove(type)
  }

}

export default new Store();
