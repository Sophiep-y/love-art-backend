import {Module} from '@nestjs/common';
import {DatabaseModule} from "../database/database.module";
import {ExhibitionsController} from "./exhibitions.controller";
import {ExhibitionsService} from "./exhibitions.service";
import {Database} from "../database/database";
import {Exhibition} from "./exhibitions.entity";

@Module({
    imports: [DatabaseModule],
    controllers: [ExhibitionsController],
    providers: [
        ExhibitionsService,
        {
            provide: "EXHIBITION_REPOSITORY",
            useFactory: (dataSource: any) => dataSource.getRepository(Exhibition),
            inject: [Database],
        }
    ],


})
export class ExhibitionsModule {
}
