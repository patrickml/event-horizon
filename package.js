Package.describe({
  name: 'patrickml:event-horizon',
  version: '1.1.0',
  // Brief, one-line summary of the package.
  summary: 'flux the meteor way',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/patrickml/event-horizon',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.3.2.4');
  api.use(['ecmascript', 'reactive-var']);
  api.addFiles('event-horizon.js', 'client', { mainModule: true });
});

Package.onTest(function(api) {
  api.use('ecmascript');
  api.use('tinytest');
  api.use('patrickml:event-horizon');
  api.addFiles('event-horizon-tests.js', 'client', { mainModule: true });
});
