/*
 * generator-tag <https://github.com/jonschlinkert/generator-tag>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var path = require('path');
var util = require('util');
var yeoman = require('yeoman-generator');
var namify = require('namify');
var renameApp = require('app-name');
var _ = require('lodash');

var userPkg = require(path.join(process.cwd(), 'package.json'));

var _appname = function(str, arr) {
  return renameApp(str, _.union(['verb', 'tag'], arr || []));
};

var VerbTagsGenerator = module.exports = function VerbTagsGenerator(args, options, config) {
  if (args.length === 0) {
    args[0] = 'mocha';
  }
  yeoman.generators.NamedBase.apply(this, arguments);
  this._.mixin({appname: _appname});
  this._.mixin({namify: namify});

  if (userPkg.author) {
    if (userPkg.author.name) {
      this.authorname = userPkg.author.name;
    } else {
      this.authorname = userPkg.author;
    }
  } else {
    this.authorname = userPkg.name;
  }

  this.tagname = _appname(this.appname);
};
util.inherits(VerbTagsGenerator, yeoman.generators.NamedBase);


VerbTagsGenerator.prototype.testFiles = function testFiles() {
  if(this.name === 'mocha') {
    this.copy('mocha.opts', 'test/mocha.opts');
    this.template('name.js', 'test/<%= _.appname(appname) %>.js');
    this.template('example.md', 'test/example.md');
    this.template('example.js', 'test/example.js');
    this.template('test.js', 'test/test.js');
  }
};