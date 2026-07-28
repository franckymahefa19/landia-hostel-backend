import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { TypeService } from './type.service';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { Type } from './entities/type.entity';

@Controller('type')
export class TypeController {
  constructor(private readonly typeService: TypeService) {}

  @Post()
  async create(@Body() createTypeDto: CreateTypeDto): Promise<Type> {
    return await this.typeService.create(createTypeDto);
  }

  @Get()
  async findAll(): Promise<Type[]> {
    return await this.typeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Type> {
    return await this.typeService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateTypeDto: UpdateTypeDto): Promise<Type> {
    return await this.typeService.update(id, updateTypeDto);
  }

  @Delete('/softdelete/:id')
  async softremove(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.softremove(id);
  }

  @Delete('/softdelete/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.restore(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.typeService.remove(id);
  }
}
