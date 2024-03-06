import {Injectable, Logger} from '@nestjs/common';
import { Client } from 'basic-ftp';
import {ConfigService} from "@nestjs/config";

@Injectable()
export class StorageService {
    private sftp: Client;
    private remotePath: string;

    private logger = new Logger('StorageService');

    constructor(
        private readonly configService: ConfigService
    ) {
        this.sftp = new Client();
        this.remotePath = '/public_html'; // replace with your actual path
        this.connect().then(r =>
            this.logger.log('Connected to SFTP server')
        );
    }

    async connect() {
        this.logger.log('Connecting to SFTP server');
        this.logger.log('FTP_HOST: ' + process.env.FTP_HOST);
        this.logger.log('FTP_PORT: ' + process.env.FTP_PORT);
        this.logger.log('FTP_USERNAME: ' + process.env.FTP_USERNAME);
        this.logger.log('FTP_PASSWORD: ' + process.env.FTP_PASSWORD);
        await this.sftp.access({
            host: process.env.FTP_HOST,
            port: Number(process.env.FTP_PORT),
            user: process.env.FTP_USERNAME,
            password: process.env.FTP_PASSWORD,
        });
    }

}