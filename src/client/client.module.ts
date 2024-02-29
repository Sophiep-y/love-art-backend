import {Module} from '@nestjs/common';
import {ClientService} from './client.service';
import {Database} from "../database/database";
import {Client} from './client.entity';
import {DatabaseModule} from "../database/database.module";

@Module({
    imports: [DatabaseModule],
    providers: [
        ClientService,
        {
            provide: "CLIENT_REPOSITORY",
            useFactory: (dataSource: any) => dataSource.getRepository(Client),
            inject: [Database],
        }
    ],
    exports: [ClientService]
})
export class ClientModule {
}
