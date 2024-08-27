import { DataSource } from 'typeorm';
import { config } from './ormconfig';

const ormseedconfig = {
  ...config,
  migrations: [__dirname + '/seeds/**/*{.ts,js}'],
};

const PostgresDataSource = new DataSource({
  ...ormseedconfig,
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default PostgresDataSource;
