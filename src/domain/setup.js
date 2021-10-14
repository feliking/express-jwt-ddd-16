const { errors, config } = require('../common');
const domain = require('./');

async function setup () {
  await domain(config.db).catch(errors.handleFatalError);

  console.log('Success Domain setup!');
  process.exit(0);
}

setup();
