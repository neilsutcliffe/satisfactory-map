import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import DefaultStore from './stores';

configure({ adapter: new Adapter() });
it('renders without crashing', () => {
  const store = new DefaultStore();
  const div = document.createElement('div');

  ReactDOM.render(<App defaultStore={store} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
