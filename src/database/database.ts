import {Injectable, Logger} from '@nestjs/common';
import {ConfigService} from '@nestjs/config';
import {DataSource, Repository} from 'typeorm';

@Injectable()
export class Database {
    private logger = new Logger('Database');
    private dataSource: DataSource;

    constructor(private configService: ConfigService) {
        this.dataSource = new DataSource({
            type: 'mariadb',
            host: this.configService.get<string>('DB_HOST'),
            port: this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        });
        // this.initializeDataSource().then(r =>
        //     console.log('Database connection established')
        // );
    }

    async initializeDataSource() {
        try {
            await this.dataSource.initialize();
        } catch (error) {
            console.error('Failed to connect to the database:', error);
            process.exit(1); // Exit the application with a failure status code
        }
    }


    getRepository<Entity>(entity: new() => Entity): Repository<Entity> {
        this.logger.log(`Getting repository for entity: ${entity.name}`);
        return this.dataSource.getRepository(entity);
    }


}