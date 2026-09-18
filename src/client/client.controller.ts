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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Client } from './entities/client.entity';
import { PaginationDto } from 'src/chambre/dto/pagination-dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

const clientImageStorage = diskStorage({
  destination: join(process.cwd(), 'uploads', 'clients'),

  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;

    callback(null, filename);
  },
});

const clientImageInterceptor = FileInterceptor('image', {
  storage: clientImageStorage,
});

@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @UseInterceptors(clientImageInterceptor)
  async create(
    @Body() createClientDto: CreateClientDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Client> {
    return await this.clientService.create(createClientDto, image);
  }

  @Get()
  async findAll(@Query() pagination: PaginationDto) {
    return await this.clientService.paginatedFindAll(
      pagination.page,
      pagination.limit,
      pagination.search,
    );
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Client> {
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(clientImageInterceptor)
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
    @UploadedFile() image?: Express.Multer.File,
  ): Promise<Client> {
    return await this.clientService.update(id, updateClientDto, image);
  }

  @Delete('/restore/:id')
  async restore(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.restore(id);
  }

  @Delete('/softdelete/:id')
  async softremove(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.softremove(id);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.remove(id);
  }
}
