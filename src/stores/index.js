import { observable, action } from 'mobx';
// import Questions from './default/Question';
// import Submission from './default/Submission';

const todos = ['make app', '???', 'make money'];

class DefaultStore {
  @observable list = [];

  constructor() {
    // Add each todo the the list
    todos.forEach(todo => {
      this.list.push(todo);
    });
  }

  @action addItem = item => {
    this.list.push(item);
  };
}

export default DefaultStore;
