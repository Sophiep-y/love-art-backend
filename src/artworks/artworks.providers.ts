import {DataSource} from "typeorm";
import {Artwork} from "./artworks.entity";

export const artworksProviders = [
    {
        provide: "ARTWORK_REPOSITORY",
        useFactory: (dataSource: DataSource) => dataSource.getRepository(Artwork),
        inject: ["DATA_SOURCE"],
    },
];
