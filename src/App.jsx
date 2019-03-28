import React, { Component } from 'react';
import 'normalize.css';
import './style.css';
import styles from './App.module.scss';
import MapContainer from './MapContainer';
import MarkerTypes from './MarkerTypes';

export default () => {
  return (
    <div className={styles.container}>
      <MapContainer />
      <MarkerTypes />
    </div>
  );
}