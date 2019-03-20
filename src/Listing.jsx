import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

@inject('defaultStore')
@observer
class Listing extends Component {
  render() {
    const { defaultStore } = this.props;
    const { list } = defaultStore;

    return (
      <ul>
        {list.map(item => (
          <li key={list.indexOf(item)}>{item}</li>
        ))}
      </ul>
    );
  }
}

export default Listing;
