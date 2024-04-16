import {Injectable, Logger, Res} from '@nestjs/common';
import {Client} from 'basic-ftp';
import {ConfigService} from "@nestjs/config";
import * as fs from 'fs';
import * as path from 'path';

/**
 * Service for handling storage operations.
 */
@Injectable()
export class StorageService {
    private client: Client;
    private logger = new Logger('StorageService');

    // Cache directory path
    private cacheDirectory = path.join(__dirname, '../../.cache');
    // Maximum cache size (1GB)
    private maxCacheSize = 1024 * 1024 * 1024;

    constructor(private readonly configService: ConfigService) {
        this.client = new Client();
        this.connect().then(r => this.logger.log('FTP Setup Complete'));
    }

    /**
     * Connect to the FTP server.
     */
    private async connect(): Promise<void> {
        try {
            this.logger.log('Connecting to FTP server');

            const ftpHost = this.configService.get<string>('FTP_HOST');
            const ftpPort = this.configService.get<number>('FTP_PORT');
            const ftpUsername = this.configService.get<string>('FTP_USERNAME');
            const ftpPassword = this.configService.get<string>('FTP_PASSWORD');

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

            this.logger.log('Connected to FTP server');
        } catch (e) {
            this.logger.error('Failed to Connect FTPS' + e);
        }
    }

    /**
     * Get the size of a directory.
     * @param directoryPath - The path of the directory.
     * @returns The size of the directory.
     */
    private getDirectorySize(directoryPath: string): number {
        const fileStats = fs.readdirSync(directoryPath).map(file => {
            const filePath = path.join(directoryPath, file);
            return fs.statSync(filePath).size;
        });

        return fileStats.reduce((total, size) => total + size, 0);
    }

    /**
     * Get a file from the cache or the FTP server.
     * @param filePath - The path of the file.
     * @param res - The response object.
     */
    async getFile(filePath: string, @Res() res: any) {
        if (!fs.existsSync(this.cacheDirectory)) {
            fs.mkdirSync(this.cacheDirectory, {recursive: true});
        }

        const localPath = path.join(this.cacheDirectory, filePath);
        const localDir = path.dirname(localPath);

        if (!fs.existsSync(localDir)) {
            fs.mkdirSync(localDir, {recursive: true});
        }

        if (fs.existsSync(localPath) && fs.statSync(localPath).isDirectory()) {
            this.logger.error('Invalid path: ' + filePath);
            res.status(404).send('File not found.');
            return;
        }

        // Check if file is in cache
        if (fs.existsSync(localPath)) {
            res.sendFile(localPath);
        } else {
            // If file is not in cache, retrieve it from FTP server
            await this.client.downloadTo(localPath, path.join('public_html', filePath)).then(() => {
                // Check cache size
                let cacheSize = this.getDirectorySize(this.cacheDirectory);

                // If cache size exceeds maximum, delete oldest files
                if (cacheSize > this.maxCacheSize) {
                    const files = fs.readdirSync(this.cacheDirectory).map(file => ({
                        file,
                        mtime: fs.statSync(path.join(this.cacheDirectory, file)).mtime,
                    }));

                    files.sort((a, b) => a.mtime.getTime() - b.mtime.getTime());

                    while (cacheSize > this.maxCacheSize && files.length > 0) {
                        fs.unlinkSync(path.join(this.cacheDirectory, files.shift().file));
                        cacheSize = this.getDirectorySize(this.cacheDirectory);
                    }
                }

                res.sendFile(localPath);
            }).catch(err => {
                this.logger.error('Error retrieving file: ' + err);
                res.status(500).send('Error retrieving file.');
            });
        }
    }
}
