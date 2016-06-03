# Dispatchment
 Dispatchment is used to call an Action from anywhere within our application. When you dispatch an Action you may pass data into the registered action.

```js
// React Native
import EventHorizon from 'react-native-event-horizon';
// or for Meteor 
import EventHorizon from 'meteor/patrickml:event-horizon';

import { DeviceEventEmitter } from 'react-native';

// it is good practice to create a variable of your default store
// by doing so we can easily reset the store back to defaults
const defaultStore = {
  visibleHeight: 0,
};

// create our store `window-height` with the default values found in
// the constant variable `defaultStore`
EventHorizon.createStore('window-height', defaultStore);

// create the action `UPDATE_WINDOW_HEIGHT` which takes in the param
// `visibleHeight`, which can be any type of object. 
// We then call `update` to update our store
// if you need to perform calculations based on old store values
// you can find the old values under the variable `store`
EventHorizon.createAction('window-height', 'UPDATE_WINDOW_HEIGHT', (store, visibleHeight, update) => {
  update({
    visibleHeight,
  });
});

// DeviceEventEmitter is a react-native function that listens to 
// native events such as `keyboardWillShow` we want to listen
// to the changes in this so we can update our UI when ever a
// keyboard is opened or closed
DeviceEventEmitter.addListener('keyboardWillShow', (e) => {
  // set the window height to the height of the window with the keyboard
  EventHorizon.dispatch('UPDATE_WINDOW_HEIGHT', e.endCoordinates.height);
});

DeviceEventEmitter.addListener('keyboardWillHide', () => {
  EventHorizon.dispatch('UPDATE_WINDOW_HEIGHT', 0);
});
```
