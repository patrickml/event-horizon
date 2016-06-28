# Counter Application
 A counter is a simple way to show reactivity with an application.
When I click this button I should expect the count on the screen to change.

Okay well lets get started.

###Create a new Application
 First create a new Meteor app by running the following command in your terminal

```
meteor create event-horizon-counter
```

###Add Dependencies
 Every application is bound to have dependencies, ours will be nothing out of the ordinary. Most of these dependencies are not required to use EventHorizon, but will help make life easier.

First lets install our npm depends.

```
npm install --save react react-dom react-komposer react-mounter
```

Yup you guessed it everything react related but that's just the npm side of things. We still need a router and of course EventHorizon!
These depends we will get from atmosphere.

```
meteor add patrickml:event-horizon kadira:flow-router
```

###Folder Creation
 Well there are many Architectures that are recommended for meteor. You can use which ever you would like, but for this example I'm going to go with what makes sense for this small application.

 Create the following folders
```
/imports/client
/imports/client/stores
/imports/client/actions
/imports/clients/ui
/imports/clients/ui/layouts
/imports/clients/ui/pages
/imports/clients/ui/components
```

 Simple enough -- we have a place for our stores and actions as well as our React Components.
 
Well that's it, Lets get onto the code!

##Code

###Create a store
 Well lets start with the store. In this application we will only need one and it will be our only source of data.

 Under `/imports/client/stores` create the file `counter.store.jsx` and add the following code:

```js
import EventHorizon from 'meteor/patrickml:event-horizon';

// create a default store and export it so we can reset the store to its original state
export const defaultStore = {
  count: 0,
};

// create and register our store with `EventHorizon`
EventHorizon.createStore('counter', defaultStore);
```

What we just did was import `EventHorizon` from our dependencies, create the default structure for our store, and of course create the store itself.

The purpose of the `defaultStore` being exportable is that you may want to reset the store. You will see an example of this later in this tutorial.


###Create some Actions
 Actions are functions that are stored in EventHorizon using a key value system. Creating an action is very simple. You tell EventHorizon what store it is for, the name of the action, and a function to perform when it's dispatched to.

The function will have three params `(store, data, update)` 

  `store` => this is the current value of the store, before updating

  `data` => this is any data you wish to pass to the action from a dispatchment (We will cover these later)

  `update` => this is the function that will update your store. It uses Object.assign({}, store, yourData) to update the store making sure we never mutate any objects. This also allows you to just update a single key in the store. Because this is a function you can update the store via callbacks and promises.

 So lets create the file `counter.actions.js` under `/imports/client/actions`
 
 Now in this file add the following code:

```js
import EventHorizon from 'meteor/patrickml:event-horizon';
import { defaultStore } from '../stores/counter.store';

// create an action that will increment the count stored in the store
EventHorizon.createAction('counter', 'INCREMENT_COUNTER', (store, data, update) => {
  update({
    count: store.count + 1,
  });
});

// create an action that will decrement the count stored in the store
EventHorizon.createAction('counter', 'DECREMENT_COUNTER', (store, data, update) => {
  // make sure our count cannot go below 0
  if (store.count > 0) {
    update({ count: store.count - 1 });
  }
});

// create an action that will set the count stored in the store
EventHorizon.createAction('counter', 'SET_COUNTER', (store, count, update) => {
  // make sure our count cannot go below 0
  if (count > 0) {
    update({ count });
  }
});


// create an action that will reset the store it its original state
EventHorizon.createAction('counter', 'RESET_COUNTER', (store, count, update) => {
  // use our default store to reset the store to its original state
  update(defaultStore);
});
```

Okay so we just created a few new actions for the store named `counter`. We will use these later in our UI to `INCREMENT`, `DECREMENT`, `SET`, and `RESET` our the value `counter` in the store.

###React and Such
 Well we obviously need some kind of UI to render our counter values in. In order to do so we will need to create our `Routes` and our `Components`.

Lets start with the routes.

 Under the `/imports/client` folder create `router.jsx` and add the following code:
 
```js
import React from 'react';
import { mount } from 'react-mounter';
import { FlowRouter } from 'meteor/kadira:flow-router';
import MainLayout from './ui/layouts/main.layout';
import CounterPage from './ui/pages/counter.page';

// render our counter page
FlowRouter.route('/', {
  name: 'counter',
  action() {
    mount(MainLayout, {
      content: <CounterPage />,
    });
  },
});
```

As you can see we will need two components `MainLayout` and `CounterPage`.

####MainLayout
 This is nothing special. It's Just a container to render our page in.

 Create the file `main.layout.jsx` under `/imports/clients/ui/layouts`

Add the following code:

```js
import React from 'react';

export default ({ content }) => (
  <div className="container">
    {content}
  </div>
);
```

Yup almost useless -- but in most apps this is how you would render things.

####Counter Page
 Ahh now things are going to start to get interesting. We are going to create the main page where we will render the counter and the buttons to dispatch events to our actions. 

Create `counter.page.jsx` under `/imports/clients/ui/pages` and add the following code:

```js
import React from 'react';
import EventHorizon from 'meteor/patrickml:event-horizon';
import Count from '../components/counter';

// set the count using the Javascript prompt function
const setCount = () => {
  // get the current value from the store in a non-reactive area i.e. the prompt
  const { count } = EventHorizon.subscribe('counter');
  // ask the user to enter a new value, but fill in the current value in the prompt
  const newCount = parseInt(prompt('Please enter the new count', count));
  // make sure the user entered a proper count > 0 and is a number
  if(newCount && newCount > 0) {
    EventHorizon.dispatch('SET_COUNTER', newCount);
  } else {
    // let the user know they entered an invalid number
    alert('Invalid Count!');
  }
}

// export our page
export default () => (
  <div className="counter-page">
    <Count />
    <button onClick={() => EventHorizon.dispatch('INCREMENT_COUNTER')}>Increment</button>
    <button onClick={() => EventHorizon.dispatch('DECREMENT_COUNTER')}>Decrement</button>
    <button onClick={setCount}>Set Count</button>
    <button onClick={() => EventHorizon.dispatch('RESET_COUNTER')}>Reset</button>
  </div>
)
```

Alright so we have a few things to talk about here. As you can see each button has a registered `onClick` which returns an arrow function that calls `EventHorizon.dispatch`. `EventHorizon.dispatch` takes two params and returns a promise. We wont go over the promise part in this tutorial, but we can explain the two params.

The params for `EventHorizon.dispatch` are 

  `NAME_OF_ACTION` => this is the registered name of an action like `INCREMENT_COUNTER`
  
  `data` => this is the data you would like to pass to your action. It can be any type of object including nothing!

So when we click on the `Increment` button we are dispatching to EventHorizon to call the action `INCREMENT_COUNTER`. We had set this up earlier in this tutorial. If you remember this action takes the current value of the store and adds one to it `store.count + 1`. This is an example of passing no data through our dispatchment. `DECREMENT_COUNTER` and `RESET_COUNTER` are the same way -- we don't need to pass any data through.

However we have another action, `SET_COUNTER`, that is under the `setCount` function. As you can see we are getting the current value from our store. Now you maybe wondering "but is it reactive?" The answer is no. We are not getting the value within a `Tracker.autorun` We can values from stores at any point in time reactive or non-reactive. Here we want to get the value so we can auto fill in the prompt -- in-case the user forgets the previous number. Once the user enters in their new number we call `EventHorizon.dispatch('SET_COUNTER', newCount)`. When we call it we also pass in the new value the user would like to see in the store, but not after checking to make sure the user entered in good data.

Dispatchment is pretty simple -- when this happens trigger this action with this data -- Then your Action defines what will happen next.

###The Counter
 Okay so thus far we have laid out our `store`, `actions`, and UI that uses our `dispatchments`, but now we need to subscribe to our store and render our value `count` reactively to the screen.

To do so create the file `counter.jsx` under `/imports/clients/ui/components` and add the following code:

```js
import React from 'react';
import { composeWithTracker } from 'react-komposer';
import EventHorizon from 'meteor/patrickml:event-horizon';

// Create the component to display the count
const Count = ({ count }) => (<p>{count}</p>);

// Make the subscription reactive by useing a `Tracker` enabled function like `composeWithTracker`
export default composeWithTracker((props, onData) => {
  // subscribe to the store which will pass `{ count: x }` as a prop to the component
  onData(null, EventHorizon.subscribe('counter'));
})(Count);
```
Well dam, that was simple. All we needed to do was use a Tracker dependent composition function like `composeWithTracker` and pass in `EventHorizon.subscribe('counter')` Now when our store updates the component will as well! 

The best part is that you can use values from your store to update your meteor subscriptions and even queries. This is because they all use `Tracker`. Meaning we **don't** need to do something like `connect(mapStateToProps)(composeWithTacker(onPropsChange)(App))` like if you we're using Redux.

Well there is only one thing left to do and that is create an entry file and let meteor do its thing!

under the original `/client` folder that was created with your application -- remove everything `main.css, main.js, main.html` and add a new file called `entry.js`.

In `entry.js` add the following code:

```js
import '/imports/client/routes';
import '/imports/client/stores/counter.store';
import '/imports/client/actions/counter.actions';
```

Now run your app and click away!
 