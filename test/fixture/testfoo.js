const test = require('eater/runner').test;

test('pacman', (done, fail) => {
  done();
});

test('pacman2', (done, fail) => {
  setTimeout(() => {
    done();
  }, 1000);
});
