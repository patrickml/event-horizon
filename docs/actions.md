# Actions
 Actions are function that are registered to a store with a unique key. We use actions to create predictable and reusable logic that can be called globally within our application. We do so by dispatching the key used to name the Action as well as the data we would like to pass to the Action.

```
// React Native
import EventHorizon from 'react-native-event-horizon';
// or for Meteor 
import EventHorizon from 'meteor/patrickml:event-horizon';

// it is good practice to create a variable of your default store
// by doing so we can easily reset the store back to defaults
const defaultStore = {
  visibleHeight: 0,
};

EventHorizon.createStore('window-height', defaultStore);

EventHorizon.createAction('window-height', 'UPDATE_WINDOW_HEIGHT', (store, visibleHeight, update) => {
  update({
    visibleHeight,
  });
});
```