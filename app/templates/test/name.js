module.exports = function(verb) {
  var dest = './test/actual/<%= _.appname(appname) %>.md';
  verb.copy('test/example.md', dest, {dest: dest});
};