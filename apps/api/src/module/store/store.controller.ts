import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { StoreService } from './store.service';
import { StoreDto } from './dto/StoreDto';

@Controller('store')
export class StoreController {
  constructor(private readonly storeService: StoreService) {}

  @Post()
  create(@Body() createStore: StoreDto) {
    return this.storeService.create(createStore);
  }

  @Get()
  findAll() {
    return this.storeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.storeService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateStore: StoreDto) {
    return this.storeService.update(+id, updateStore);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.storeService.remove(+id);
  }
}
