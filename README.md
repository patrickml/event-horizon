# Event Horizon

Event Horizon is an application architecture that for building client-side web applications. It is similar to the Redux system except Event Horizon uses Tracker dependent variables like `ReactiveVar`. There are no more `Reducers` no more `Trunking` any async callback functions and no more how do i get my data into it. Storing your application's UI state in Event Horizon allows for dispatchments to open and close modals, submit forms, and event what direction to sort a table. 

### Version
0.0.1

### Tech

Event Horizon uses a number of open source projects to work properly:

* [MeteorJS] - Meteor is a complete platform for building web and mobile apps in pure JavaScript.
* [BabelJS] - Babel transforms your JavaScript
* [node.js] - evented I/O for the backend

### Documentation
https://www.gitbook.com/book/patrickml/event-horizon

### Installation

```sh
$ meteor add patrickml:event-horizon
```


### Development

Want to contribute? Great!

Event Horizon uses ES2015 (ES6) and babel so we can use tomorrows code today!

License
----

MIT License

Copyright (c) 2016 Patrick Lewis

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


   [node.js]: <http://nodejs.org>
   [BabelJS]: <http://babeljs.com>
   [MeteorJS]: <http://meteor.com>
