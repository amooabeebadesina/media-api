import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WaitlistModule } from './api/waitlist/waitlist.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './api/user/user.module';
import { VideoModule } from './api/video/video.module';
import configuration from './config/configuration';

@Module({
  imports: [
      ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration]
      }),
      WaitlistModule,
      MongooseModule.forRoot(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`),
      UserModule,
      VideoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
