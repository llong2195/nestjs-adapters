import { KoaAdapter } from '@nestjs-adapters/koa';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const importDynamic = new Function(
    'modulePath',
    'return import(modulePath)',
);

async function bootstrap() {
    // const { App } = await importDynamic('@tinyhttp/app');

    // const tApp = new App();

    const app = await NestFactory.create(AppModule, new KoaAdapter());
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: VersioningType.URI,
    });
    app.useGlobalPipes(new ValidationPipe());
    await app.listen(3000);
}
bootstrap();
