/*!
 * generator-tag https://github.com/jonschlinkert/generator-tag
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */

'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var exec = require('child_process').exec;
var changeCase = require('change-case');
var Configstore = require('configstore');
var appname = require('app-name');
var namify = require('namify');
var normalize = require('normalize-pkg');
var yeoman = require('yeoman-generator');
var log = require('verbalize');

function introductionMessage() {
  console.log(log.bold('  Head\'s up!'));
  console.log();
  console.log(log.gray('  generator-tag saves time by offering to re-use answers from the'));
  console.log(log.gray('  previous run. If something is incorrect, no worries!'));
  console.log(log.gray('  Just provide a new value!'));
  console.log();
}

log.runner = 'generator-tag';

var verbTagsConfig = new Configstore('generator-tag');
var userPkg = {};

var VerbTagsGenerator = module.exports = function VerbTagsGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);
  var self = this;

  // Mix methods from change-case into yeoman's Lo-Dash
  this._.mixin(changeCase);
  this._.mixin({namify: namify});
  this._.mixin({appname: appname});
  this.appname = changeCase.paramCase(this.appname);

  this.readJSON = function() {
    var filepath = path.join.apply(path, arguments);
    return JSON.parse(self.readFileAsString(filepath));
  };

  this.on('end', function () {
    this.installDependencies({
      skipInstall: this.options['skip-install'] || this.options['s'],
      skipMessage: this.options['skip-welcome-message'] || this.options['w']
    });
  });

  this.pkg = this.readJSON(__dirname, '../package.json');
  this.username = this.user.git.username || process.env.user || process.env.username || null;

  if (fs.existsSync('package.json') && (this.options['p'] || this.options['pkg'])) {
    userPkg = normalize.all(this.readJSON('package.json'));
  }
};
util.inherits(VerbTagsGenerator, yeoman.generators.Base);


VerbTagsGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var prompts = [];

  // have Yeoman greet the user, unless skipped
  if (!this.options['skip-welcome-message']) {
    console.log(this.yeoman);
    introductionMessage();
  }

  var author = verbTagsConfig.get('author') || {};
  var username = verbTagsConfig.get('username') || this.username;

  prompts.push({
    name: 'projectname',
    message: 'What is the name of the tag?',
    default: userPkg.name ? userPkg.name : this.appname
  });

  prompts.push({
    name: 'projectdesc',
    message: 'Want to add a description?',
    default: userPkg.description || 'Custom tag, for Verb.'
  });

  prompts.push({
    name: 'authorname',
    message: 'What is the author\'s name?',
    default: author.name || ((userPkg.author && userPkg.author.name) ? userPkg.author.name : this.username)
  });

  prompts.push({
    name: 'authorurl',
    message: 'What is the author\'s URL?',
    default: 'https://github.com/' + username
  });

  prompts.push({
    name: 'username',
    message: 'If pushed to GitHub, what username/org will it live under?',
    default: username
  });

  this.prompt(prompts, function (answers) {

    verbTagsConfig.set('username', answers.username);
    verbTagsConfig.set('author', {
      name: answers.authorname,
      url: answers.authorurl
    });

    this.authorname = verbTagsConfig.get('author').name;
    this.authorurl = verbTagsConfig.get('author').url;
    this.username = verbTagsConfig.get('username');

    this.projectname = answers.projectname;
    this.projectdesc = answers.projectdesc;

    cb();
  }.bind(this));
};

VerbTagsGenerator.prototype.app = function app() {
  var pkgTemplate = this.readFileAsString(path.join(this.sourceRoot(), './_package.json'));
  var verbTagsDefaultPkg = this.engine(pkgTemplate, this);

  // If a package.json already exists, let's try to just update the
  // values we asked about, and leave other data alone.
  if (fs.existsSync('package.json')) {
    var pkg = this.readJSON('package.json');
    pkg.devDependencies = pkg.devDependencies || {};

    // Add any missing properties to the existing package.json
    this._.defaults(pkg, JSON.parse(verbTagsDefaultPkg));

    // Update some values we asked the user to provide.
    this._.extend(pkg.name, this.projectname);
    this._.extend(pkg.description, this.projectdesc);
    this._.extend(pkg.author.name, this.authorname);
    this._.extend(pkg.author.url, this.authorurl);

    // Add `verbTags` to devDependencies.
    this._.extend(pkg.devDependencies, JSON.parse(verbTagsDefaultPkg).devDependencies);

    fs.unlink('package.json');
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2));
  } else {
    this.template('_package.json', 'package.json');
  }
};


VerbTagsGenerator.prototype.readme = function readme() {
  this.copy('verbrc.md', '.verbrc.md');
};

VerbTagsGenerator.prototype.tag = function tag() {
  if (!fs.existsSync('lib/' + this.appname + '.js')) {
    this.template('tag.js', 'lib/' + this.appname + '.js');
  }
};

VerbTagsGenerator.prototype.index = function index() {
  this.template('index.js', 'index.js');
};

VerbTagsGenerator.prototype.jshintrc = function jshintrc() {
  this.copy('jshintrc', '.jshintrc');
};

VerbTagsGenerator.prototype.git = function git() {
  this.copy('gitignore', '.gitignore');
  this.copy('gitattributes', '.gitattributes');
};

VerbTagsGenerator.prototype.license = function license() {
  this.template('LICENSE-MIT');
};
