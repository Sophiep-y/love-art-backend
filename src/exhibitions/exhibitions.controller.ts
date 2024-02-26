import { Controller, Get } from '@nestjs/common';

@Controller('exhibitions')
export class ExhibitionsController {

  @Get()
  async findAll(): Promise<string> {
    return 'This action returns all exhibitions';
  }
}
