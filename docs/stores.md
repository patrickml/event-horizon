# Stores
 Stores are created to hold data for a particular part of your UI. To reduce the number of re-renders we went with a multi-store system. When you subscribe to a store, you will receive update ONLY for that store.

###Creating a Store

```js
// React Native
import EventHorizon from 'react-native-event-horizon';
// or for Meteor 
import EventHorizon from 'meteor/patrickml:event-horizon';

// it is good practice to create a variable of your default store
// by doing so we can easily reset the store back to defaults
const defaultStore = {
  visibleHeight: 0,
};

// create our store `window-height` with the default values found in
// the constant variable `defaultStore`
EventHorizon.createStore('window-height', defaultStore);
```