import {Injectable, Logger} from '@nestjs/common';
import {Client} from 'basic-ftp';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class StorageService {
    private client: Client;

    private logger = new Logger('StorageService');

    constructor(
        private readonly configService: ConfigService
    ) {
        this.client = new Client();
        this.connect().then(r =>
            this.logger.log('FTP Setup Complete')
        );
    }

    private async connect(): Promise<void> {
        try {
            this.logger.log('Connecting to FTP server');


            const ftpHost = this.configService.get<string>('FTP_HOST')
            const ftpPort = this.configService.get<number>('FTP_PORT')
            const ftpUsername = this.configService.get<string>('FTP_USERNAME')
            const ftpPassword = this.configService.get<string>('FTP_PASSWORD')


            this.logger.log('FTP_HOST: ' + ftpHost);
            this.logger.log('FTP_PORT: ' + ftpPort);
            this.logger.log('FTP_USERNAME: ' + ftpUsername);
            this.logger.log('FTP_PASSWORD: ' + ftpPassword);

            await this.client.access({
                host: ftpHost,
                port: ftpPort,
                user: ftpUsername,
                password: ftpPassword,
            });
            this.logger.log('Connected to FTP server')
        } catch (e) {
            this.logger.error('Failed to Connect FTPS' + e);
        }
    }



}