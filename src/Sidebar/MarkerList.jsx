import React, { Component } from 'react'
import { observer } from 'mobx-react';
import styles from './Sidebar.module.scss'

const Icon = ({ id }) => <img alt={id} className={styles.icon} src={require(`../assets/${id}.svg`)} />


const NodeCell = ({ id, typesActive, toggleMarker }) => {
  return (
    <td className={typesActive.includes(id) ? styles.selected : ""} onClick={() => toggleMarker(id)}>
      <Icon id={id} />
    </td>
  )
}

const Node = ({ toggleMarker, text, id, typesActive }) => {
  const impure = `node-${id}-impure`;
  const normal = `node-${id}-normal`;
  const pure = `node-${id}-pure`;

  return (
    <tr>
      <td className={styles.name}>{text}</td>
      <NodeCell id={impure} typesActive={typesActive} toggleMarker={toggleMarker} />
      <NodeCell id={normal} typesActive={typesActive} toggleMarker={toggleMarker} />
      <NodeCell id={pure} typesActive={typesActive} toggleMarker={toggleMarker} />
    </tr>
  )
}

const Slugs = ({ toggleMarker, typesActive }) => {
  return (
    <tr>
      <td className={styles.name}>Slugs</td>
      <NodeCell id={'slug-green'} typesActive={typesActive} toggleMarker={toggleMarker} />
      <NodeCell id={'slug-yellow'} typesActive={typesActive} toggleMarker={toggleMarker} />
      <NodeCell id={'slug-purple'} typesActive={typesActive} toggleMarker={toggleMarker} />
    </tr>
  )
}

@observer
class MarkerTypes extends Component {
  render() {

    const { types, toggleMarker } = this.props;

    const typesActive = types.filter(x => x.enabled).map(x => x.id)
    const titles = { 'crash': 'Drop Pods', 'geyser': 'Geysers', 'unknown': 'Unknown' }

    return (
      <div className={styles.markerList}>

        <table className={styles.table}>
          <thead>
            <tr>
              <th />
              <th>Impure</th>
              <th>Normal</th>
              <th>Pure</th>
            </tr>
          </thead>
          <tbody>
            <Node id={"iron"} text={"Iron"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"copper"} text={"Copper"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"limestone"} text={"Limestone"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"coal"} text={"Coal"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"oil"} text={"Oil"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"bauxite"} text={"Bauxite"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"caterium"} text={"Caterium"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"sulphur"} text={"Sulphur"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"quartz"} text={"Quartz"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"uranium"} text={"Uranium"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Node id={"sam"} text={"SAM Ore"} toggleMarker={toggleMarker} typesActive={typesActive} />
            <Slugs toggleMarker={toggleMarker} typesActive={typesActive} />
          </tbody>
        </table>
        <ul>

          {
            types.filter(x => !x.id.startsWith('node-') && !x.id.startsWith("slug-")).map((type) => {
              const className = type.enabled ? styles.enabled : styles.hidden
              return (
                <li className={className} key={type.id}
                  onClick={() => toggleMarker(type.id)}>
                  <span className={styles.markerLabel}>
                    <Icon id={type.id} />
                    {titles[type.id]}
                  </span>
                  <br />
                </li>
              )
            }
            )
          }
        </ul>
      </div>
    )
  }
}

export default MarkerTypes;