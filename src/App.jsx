import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Listing from './components/Listing';
import 'normalize.css';
import styles from './App.module.scss';

@inject('defaultStore')
@observer
class App extends Component {
  render() {
    const { defaultStore } = this.props;
    return (
      <div className={styles.container}>
        <h1>Default</h1>
        <Listing list={defaultStore.list} />
      </div>
    );
  }
}

export default App;
