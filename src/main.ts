import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {ArgumentMetadata, INestApplication, Logger, PipeTransform, ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";
import {instanceToPlain} from 'class-transformer';
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { classToPlain } from 'class-transformer';


async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    // app.enableCors({
    //     origin: [
    //         'http://localhost:3000',
    //         'https://loveart.duckdns.org/',
    //         'http://loveart.duckdns.org/',
    //         'https://loveart.duckdns.org',
    //         'http://loveart.duckdns.org',
    //         'https://www.loveart.duckdns.org/',
    //         'http://www.loveart.duckdns.org/',
    //         'https://www.loveart.duckdns.org',
    //         'http://www.loveart.duckdns.org',
    //     ],
    //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    //     preflightContinue: false,
    //     optionsSuccessStatus: 204,
    //     credentials: true,
    // })

    app.enableCors({
        origin: "*",
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })

    app.setGlobalPrefix("api",)
    setupSwagger(app);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe(
            {
                transform: true,
                whitelist: true,
            }
        ),
    );

    app.useGlobalInterceptors(
        new TransformResponseInterceptor(),
    )
    console.log(configService.get<number>("PORT") || 3000);
    await app.listen(configService.get<number>("PORT") || 3000);

}

bootstrap().then((r) => new Logger().log(`Server running`));

function setupSwagger(app: INestApplication): void {
    const config = new DocumentBuilder()
        .setTitle("Love Art")
        .setDescription("The Love Art API Documentation")
        .setVersion("1.0")
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup("/api-docs", app, document);
}


@Injectable()
export class TransformResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(map(data => instanceToPlain(data)));
    }
}