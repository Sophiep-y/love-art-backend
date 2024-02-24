import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication, Logger} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })

    app.setGlobalPrefix("api")
    setupSwagger(app);
    const configService = app.get(ConfigService);
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
