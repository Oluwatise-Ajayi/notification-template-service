import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ResponseInterceptor } from './common/interceptors/response.interceptors';
import { HttpExceptionFilter } from './common/filter/http-exception.filter';
import { EtcdService } from './common/services/etcd.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const etcdService = app.get(EtcdService);
  const port = parseInt(process.env.PORT || '3001', 10);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  await etcdService.registerService(
    'template-service',
    'template-service-001',
    'template-service',
    port,
  );

  // Graceful shutdown
  process.on('SIGTERM', () => {
    (async () => {
      await etcdService.deregisterService(
        'template-service',
        'template-service-001',
      );
      await app.close();
    })();
  });

  await app.listen(port);
  console.log(`Template Service running on port ${port}`);
  console.log(`Health check: http://localhost:${port}/health`);
}
bootstrap();
