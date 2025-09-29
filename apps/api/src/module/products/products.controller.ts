import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { DatabaseService } from '../database/database.service';
import { Prisma } from 'generated/prisma';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private readonly database: DatabaseService,
  ) {}

  @Post()
  create(@Body() createProduct: Prisma.Scrap_ItemsCreateInput) {
    return this.productsService.create(createProduct);
  }

  @Get()
  findAll() {
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateProduct: Prisma.Scrap_ItemsUpdateInput,
  ) {
    return this.productsService.update(+id, updateProduct);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.productsService.remove(+id);
  }
}
