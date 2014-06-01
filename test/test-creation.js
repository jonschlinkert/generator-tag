/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;


describe('tag', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {return done(err);}

      this.app = helpers.createGenerator('tag:app', ['../../app']);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      'package.json',
      '.verbrc.md',
      '.jshintrc',
      '.gitignore',
      '.gitattributes',
      'LICENSE-MIT',
    ];

    helpers.mockPrompt(this.app, {
      projectname: 'tag-project',
      projectdesc: 'The most interesting project in the world > tag',
      username:    'jonschlinkert',
      authorname:  'Jon Schlinkert',
      authorurl:   'https://github.com/jonschlinkert',
    });

    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
