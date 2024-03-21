import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication, Logger, ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
            'https://love-art-git-wipbranch-love-art.vercel.app',
            'https://loveart.duckdns.org',
            'http:http://54.227.86.84',
            'http://localhost:3000',
        ],
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })

    app.setGlobalPrefix("api")
    setupSwagger(app);
    const configService = app.get(ConfigService);
    app.useGlobalPipes(new ValidationPipe());
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
