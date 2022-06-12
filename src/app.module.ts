import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './modules/prisma/prisma.module';
import { LoggerMiddleware } from './common/Middlware/logger.middleware';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';

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
  providers: [AppService],
})

export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}