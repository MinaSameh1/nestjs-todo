import { MiddlewareConsumer, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerMiddleware } from './common/Middlware/logger.middleware';
import { AppService } from './app.service';
import { AccessTokenGuard } from './common/guards';

@Module({
  imports: [
    AuthModule,
    UserModule,
    TodoModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    })
  ],
  providers: [AppService, 
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}