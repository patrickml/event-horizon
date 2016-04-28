import EventHorizon from '../event-horizon';

export default class Action {
  constructor(store, name, action) {
    this.store = store;
    this.name = name;
    this.action = action;
  }

  perform(data) {
    this.action(EventHorizon.subscribe(this.store), data, this.updateStore.bind(this));
    return new Promise((resolve, reject) => {
      resolve(EventHorizon.subscribe(this.store));
    });
  }

  updateStore(data) {
    EventHorizon.update(this.store, data);
  }
}
