import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { FactureService } from './facture.service';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';
import { Facture } from './entities/facture.entity';

@Controller('facture')
export class FactureController {
  constructor(private readonly factureService: FactureService) {}

  @Post()
  async create(@Body() createFactureDto: CreateFactureDto): Promise<Facture> {
    return await this.factureService.create(createFactureDto);
  }

  @Get()
  async findAll(): Promise<Facture[]> {
    return await this.factureService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Facture> {
    return await this.factureService.findOne(id);
  }

  @Patch(':id')
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateFactureDto: UpdateFactureDto): Promise<Facture> {
    return await this.factureService.update(id, updateFactureDto);
  }

  @Delete('/softdelete/:id')
  async softdelete(@Param('id', ParseIntPipe) id: number) {
    return await this.factureService.softremove(id);
  }

  @Delete('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.factureService.restore(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.factureService.remove(id);
  }
}
