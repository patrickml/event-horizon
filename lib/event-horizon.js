import { Meteor } from 'meteor/meteor';
import Store from './store';
import Action from './action';

export default class EventHorizon {
  constructor() {
    this.stores = {
      default: new Store('default', {}),
    };
    this.actions = {};
  }

  /**
   * Creates a new Store
   * @param  {[type]} name  the name of the store
   * @param  {Object} obj   Initial content
   */
  createStore(name, data = {}) {
    this.stores[name] = new Store(name, data);
  }

  /**
   * Creates a new Action
   * @param  {String}   store  the name of the store
   * @param  {String}   name   the name of the action
   * @param  {Function} action the action to perform
   */
  createAction(store, name, action) {
    this.actions[name] = new Action(store, name, action);
  }

  /**
   * Subscribes to a particular store
   * @param  {[type]} name  the name of the store
   * @return {Object}       the stores contents
   */
  subscribe(name) {
    if (!this.stores[name]) {
      throw new Meteor.Error('No Store', `No store with name ${name}`);
    }

    return this.stores[name].subscribe();
  }

  /**
   * Updates a store
   * @param  {String} name  the name of the store
   * @param  {Object} data  the new data to be added to the store
   */
  update(name, data) {
    if (!this.stores[name]) {
      throw new Meteor.Error('No Store', `No store with name ${name}`);
    }

    this.stores[name].update(data);
  }

  /**
   * Dispatches an event to the action
   * @param  {String} name the name of the action
   * @param  {Object} data the new data
   * @return {Promise}     a promise
   */
  dispatch(name, data) {
    if (!this.actions[name]) {
      throw new Meteor.Error('No Action', `No Action with name ${name}`);
    }

    return this.actions[name].perform(data);
  }

  /**
   * Removes a store from memory
   * @param  {String} name  the name of the store
   */
  destroy(name) {
    if (!this.stores[name]) {
      throw new Meteor.Error('No Store', `No store with name ${name}`);
    }

    delete this.stores[name];
  }
}
