import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {Newsletters} from "./newsletters.entity";
import {ArchivesController} from './newsletters.controller';
import {newslettersProviders} from "./newsletters.providers";
import {NewslettersService} from "./newsletters.service";

@Module({
    imports: [
        DatabaseModule,
    ],
    controllers: [
        ArchivesController,
    ],
    providers: [
        ...newslettersProviders,
        NewslettersService,
        Newsletters,
    ],
    exports: []
})

export class NewslettersModule {
}
