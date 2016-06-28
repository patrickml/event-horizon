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
These depends we will get from atmosphere

```
meteor add patrickml:event-horizon kadira:flow-router
```