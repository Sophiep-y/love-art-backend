import { DataSource } from "typeorm";
import { Artist } from "./artist.entity";

export const artistProviders = [
  {
    provide: "ARTIST_REPOSITORY",
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Artist),
    inject: ["DATA_SOURCE"],
  },
];
