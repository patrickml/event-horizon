import EventHorizon from '../event-horizon';

export default class Action {
  constructor(store, name, action) {
    this.store = store;
    this.name = name;
    this.action = action;
  }

  /**
   * Performs an action
   * @param  {Object} data  the data use for the action
   * @return {Promise}
   */
  perform(data) {
    const result = this.action(EventHorizon.subscribe(this.store), data, this.updateStore.bind(this));
    if (result && result instanceof Promise) {
      return result;
    }
    return new Promise((resolve, reject) => {
      resolve(EventHorizon.subscribe(this.store));
    });
  }

  /**
   * Updates a the actions store with new data
   * @param  {Object} data  the new data to be added/updated in the store
   */
  updateStore(data) {
    EventHorizon.update(this.store, data);
    return data;
  }
}
