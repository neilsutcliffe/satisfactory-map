import React from 'react';
import 'normalize.css';
import styles from './App.module.scss';
import MapContainer from './MapContainer/MapContainer';
import Sidebar from './Sidebar/Sidebar';

export default () => {
  return (
    <div className={styles.container}>
      <MapContainer />
      <Sidebar />
    </div>
  );
}