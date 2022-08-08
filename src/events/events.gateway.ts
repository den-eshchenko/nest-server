import { Module } from '@nestjs/common';
import { EventsGateway } from './events.module';

@Module({
  providers: [EventsGateway],
})
export class EventsModule {}