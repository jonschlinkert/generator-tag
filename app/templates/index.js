/*!
 * <%= appname %> <https://github.com/<%= username %>/<%= appname %>>
 *
 * Copyright (c) 2014 <%= authorname %>, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var <%= _.appname(appname) %> = require('<%= appname %>');

module.exports = function (verb) {
  var tags = {};

  tags.<%= _.appname(appname) %> = function (content) {
    return <%= _.appname(appname) %>(content);
  };

  // Example tag
  tags.example = function (content) {
    return content.toUpperCase();
  };
  return tags;
};