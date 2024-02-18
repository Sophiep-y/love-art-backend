import {DataSource} from "typeorm";

export const databaseProviders = [
    {
        provide: "DATA_SOURCE",
        useFactory: async () => {
            const dataSource = new DataSource({
                type: "mariadb",
                host: "clients.loveart.com",
                port: 3306,
                username: "loveartc",
                password: "C6ipE9n5w7",
                database: "loveartc_db1",
                entities: [__dirname + "/../**/*.entity{.ts,.js}"],
            });
            return dataSource.initialize();
        },
    },
];
