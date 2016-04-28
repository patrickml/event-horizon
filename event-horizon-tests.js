// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by event-horizon.js.
import { name as packageName } from "meteor/event-horizon";

// Write your tests here!
// Here is an example.
Tinytest.add('event-horizon - example', function (test) {
  test.equal(packageName, "event-horizon");
});
