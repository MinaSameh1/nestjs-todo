import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { AccessTokenGuard } from './common/guards'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  app.useGlobalGuards(new AccessTokenGuard())
  app.setGlobalPrefix('api')
  await app.listen(8000)
}
bootstrap()
