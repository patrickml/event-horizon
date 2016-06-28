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

Well that's it! Lets get onto the code.


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

 Simple enough -- we have a place for our stores and action as well as our React Components.