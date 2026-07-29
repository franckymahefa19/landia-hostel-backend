import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { PaiementService } from './paiement.service';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { Paiement } from './entities/paiement.entity';

@Controller('paiement')
export class PaiementController {
  constructor(private readonly paiementService: PaiementService) {}

  @Post()
  async create(
    @Body() createPaiementDto: CreatePaiementDto,
  ): Promise<Paiement> {
    return await this.paiementService.create(createPaiementDto);
  }

  @Get()
  async findAll(): Promise<Paiement[]> {
    return await this.paiementService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Paiement> {
    return await this.paiementService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePaiementDto: UpdatePaiementDto,
  ): Promise<Paiement> {
    return await this.paiementService.update(id, updatePaiementDto);
  }

  @Delete('/softdelete/:id')
  async softdelete(@Param('id', ParseIntPipe) id: number) {
    return await this.paiementService.softremove(id);
  }

  @Delete('/restore/:id')
  async resotre(@Param('id', ParseIntPipe) id: number) {
    return await this.paiementService.restore(id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.paiementService.remove(+id);
  }
}
