import {DataSource} from "typeorm";

export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "mariadb",
                host: "localhost",
                port: 3306,
                username: "root",
                password: "mypass",
                database: "loveartc_db1",
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            });
            return dataSource.initialize();
        },
    },
];
