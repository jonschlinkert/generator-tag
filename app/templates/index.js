/*!
 * <%= appname %> <https://github.com/<%= username %>/<%= appname %>>
 *
 * Copyright (c) 2014 <%= authorname %>, contributors.
 * Licensed under the MIT license.
 */
'use strict';

var <%= _.namify(appname) %> = require('<%= appname %>');

module.exports = function (verb) {
  var tags = {};

  tags.<%= _.namify(appname) %> = function (content) {
    return <%= _.namify(appname) %>(content);
  };
  return tags;
};