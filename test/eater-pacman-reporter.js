const EaterPacmanReporter = require('../index');
const Eater = require('eater').Eater;
const reporter = new EaterPacmanReporter();
const eater = new Eater({
  reporter: reporter,
  dir: './test/fixture',
  ext: '.js'
});

eater.eat();

eater.on('err', (hasAnyError) => {
  console.error('failure');
});
