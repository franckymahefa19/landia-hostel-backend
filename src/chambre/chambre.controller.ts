import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ChambreService } from './chambre.service';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { Chambre } from './entities/chambre.entity';
import { PaginationDto } from './dto/pagination-dto';

@Controller('chambre')
export class ChambreController {
  constructor(private readonly chambreService: ChambreService) {}

  @Post()
  async create(@Body() createChambreDto: CreateChambreDto): Promise<Chambre> {
    return await this.chambreService.create(createChambreDto);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await this.chambreService.paginatedFindAll(
      pagination.page,
      pagination.limit,
      pagination.search,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Chambre> {
    return await this.chambreService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChambreDto: UpdateChambreDto,
  ): Promise<Chambre> {
    return this.chambreService.update(id, updateChambreDto);
  }

  @Delete('/softdelete/:id')
  async softremove(@Param('id', ParseIntPipe) id: number) {
    return await this.chambreService.softremove(id);
  }

  @Delete('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.chambreService.restore(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.chambreService.remove(id);
  }
}
