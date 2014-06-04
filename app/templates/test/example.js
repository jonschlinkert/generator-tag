/**
 * Example tag. This is only used to make sure the
 * mocha test is working. To use it in your new project,
 * just run `mocha`
 */

module.exports = function(verb) {
  var tags = {};

  tags.example = function (content) {
    return content.toUpperCase();
  };
  return tags;
};
