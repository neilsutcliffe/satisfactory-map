import React, { Component } from 'react';

class Listing extends Component {
  render() {
    const { list } = this.props;
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
