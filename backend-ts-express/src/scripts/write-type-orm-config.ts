import { dbConnection } from '@databases';
import fs = require('fs');
const typeORMConfigs = [
  dbConnection,
  {
    ...dbConnection,
    name: 'seed',
    // migrations: ['src/seeds/*.ts'],
    seeds: ['src/seeds/**/*{.ts,.js}'], //https://github.com/w3tecch/typeorm-seeding
    factories: ['src/factories/**/*{.ts,.js}'], //https://github.com/w3tecch/typeorm-seeding
    // cli: {
    //   migrationsDir: 'src/seeds',
    // },
  },
];
fs.writeFileSync('ormconfig.json', JSON.stringify(typeORMConfigs, null, 2));
