import {DataSource} from "typeorm";
import {Newsletters} from "./newsletters.entity";

export const newslettersProviders = [
    {
        provide: "NEWSLETTER_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Newsletters),
        inject: ["DATA_SOURCE"],
    },
];
