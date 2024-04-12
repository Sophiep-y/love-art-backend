import {NestFactory} from "@nestjs/core";
import {AppModule} from "./app.module";
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import {INestApplication, Logger, ValidationPipe} from "@nestjs/common";
import {ConfigService} from "@nestjs/config";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors({
        origin: [
'https://loveart.duckdns.org/', 'http://loveart.duckdns.org/', 'https://loveart.duckdns.org', 'http://loveart.duckdns.org',
'http://localhost:3000', 
            'https://www.loveart.duckdns.org/', 'http://www.loveart.duckdns.org/', 'https://www.loveart.duckdns.org', 'http://www.loveart.duckdns.org',

	
	],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        preflightContinue: false,
        optionsSuccessStatus: 204,
        credentials: true,
    })

    app.setGlobalPrefix("api",)
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
