import { Module } from '@nestjs/common';
import { NewsartworksService } from './newsartworks.service';

@Module({
  providers: [NewsartworksService]
})
export class NewsartworksModule {}
