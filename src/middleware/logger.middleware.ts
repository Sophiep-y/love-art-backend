import {Injectable, Logger, NestMiddleware} from '@nestjs/common';
import {NextFunction, Request, Response} from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
    private logger = new Logger('HTTP');

    use(request: Request, response: Response, next: NextFunction): void {
        const {method, path, originalUrl, headers} = request;
        const userAgent = request.get('user-agent') || '';


        response.on('finish', () => {
            const {statusCode} = response;

            this.logger.log(
                `[${method}] [${originalUrl}] [${statusCode}] - [${userAgent}] [${headers['x-forwarded-for']}]`,
            );
        });

        next();
    }
}