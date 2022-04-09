import fs from 'fs';
import { dbConnection } from '@/databases/index';
const config = [dbConnection, { ...dbConnection, name: 'seed', seeds: ['src/seeds/**/*{.ts,.js}'], factories: ['src/factories/**/*{.ts,.js}'] }];
fs.writeFileSync('ormconfig.json', JSON.stringify(config, null, 2));
