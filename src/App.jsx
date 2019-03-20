import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Listing from './Listing';
import 'normalize.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Bananas</h1>
        <Listing />
      </div>
    );
  }
}

export default App;
