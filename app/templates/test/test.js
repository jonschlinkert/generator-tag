/*!
 * <%= _.slugify(appname) %>
 *
 * Copyright (c) 2014 <%= authorname %>, contributors
 * Licensed under the MIT License (MIT)
 */

var file = require('fs-utils');
var verb = require('verb');
var expect = require('chai').expect;
var <%= _.appname(appname) %> = require('../');

describe('<%= appname %>:', function () {
  it('should use the example.js tag in the example.md markdown file.', function (done) {
    var fixture = require('./<%= _.appname(appname) %>.js')(verb);
    var actual = file.exists('test/actual/<%= _.appname(appname) %>.md');
    expect(actual).to.eql(true);
    done();
  });
});