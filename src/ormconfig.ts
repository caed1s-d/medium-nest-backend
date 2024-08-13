import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const config: PostgresConnectionOptions = {
  database: 'medium_nest',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  password: '123',
  username: 'medium_user',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/migrations/**/*{.ts,js}'],
  synchronize: false,
  // dropSchema: true,
};

const PostgresDataSource = new DataSource({
  ...config,
});

PostgresDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });

export default PostgresDataSource;
