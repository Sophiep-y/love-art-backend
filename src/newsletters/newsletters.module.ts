import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {Newsletters} from "./newsletters.entity";
import {ArchivesController} from './newsletters.controller';
import {NewslettersService} from "./newsletters.service";
import {Database} from "../database/database";

@Module({
    imports: [DatabaseModule],
    controllers: [ArchivesController],
    providers: [
        NewslettersService,
        {
            provide: "NEWSLETTER_REPOSITORY",
            useFactory: (dataSource: Database) => dataSource.getRepository(Newsletters),
            inject: [Database],
        }
    ],
    exports: []
})

export class NewslettersModule {
}
