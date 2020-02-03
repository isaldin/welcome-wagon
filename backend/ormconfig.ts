import typeormConfig from './src/config/typeorm.config';

export = [
  // default config section for migrations
  {
    ...typeormConfig.getTypeOrmConfig(),
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'migration',
    migrations: ['src/migration/*.ts'],
    cli: {
      migrationsDir: 'src/migration',
    },
  },
  // named config section for seeding
  {
    ...typeormConfig.getTypeOrmConfig(),
    name: 'seed',
    entities: ['src/**/*.entity.ts'],
    migrationsTableName: 'migration',
    migrations: ['src/seed/*.ts'],
    cli: {
      migrationsDir: 'src/seed',
    },
  },
];
