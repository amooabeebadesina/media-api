import { Module } from '@nestjs/common';
import { WaitlistController } from './waitlist.controller';
import { WaitlistService } from './waitlist.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Waitlist, WaitlistSchema } from './schemas/waitlist.schema';

@Module({
  controllers: [WaitlistController],
  imports: [MongooseModule.forFeature([{ name: Waitlist.name, schema: WaitlistSchema}])],
  providers: [WaitlistService]
})
export class WaitlistModule {}
