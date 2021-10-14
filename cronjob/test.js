'use strict';

// Para ejecutar el CronJob se puede usar crontab, video explicativo: https://youtu.be/ppFqkXJmwS0

const { errors, config } = require('../src/common');
const domain = require('../src/domain');
const moment = require('moment');

(async () => {
  let services = await domain(config.db).catch(errors.handleFatalError);
  const { Modulo } = services;

  console.time('=========> TIEMPO TOTAL');

  try {
    console.log('========== INICIO CRON ==========', moment().format('DD/MM/YYYY HH:mm:ss'));
    await Modulo.getMenu();
    console.log('========== FIN CRON ==========', moment().format('DD/MM/YYYY HH:mm:ss'));
  } catch (e) {
    console.error('ERROR EN EL CRON JOB:', e);
  }

  console.timeEnd('=========> TIEMPO TOTAL');
  process.exit();
})();
