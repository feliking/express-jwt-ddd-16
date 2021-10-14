const { errors, config } = require('../common');
const app = require('./');

async function setup () {
  const App = await app(config.db).catch(errors.handleFatalError);

  console.log('Success App setup!', App);
  process.exit(0);
}

setup();
