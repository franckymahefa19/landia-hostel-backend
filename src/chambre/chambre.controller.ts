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
  UploadedFiles,
} from '@nestjs/common';
import { ChambreService } from './chambre.service';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { Chambre } from './entities/chambre.entity';
import { PaginationDto } from './dto/pagination-dto';
import { diskStorage } from 'multer';
import { join } from 'path';
import {
  FileFieldsInterceptor,
  FileInterceptor,
} from '@nestjs/platform-express';

const chambreImageStorage = diskStorage({
  destination: join(process.cwd(), 'uploads', 'chambres'),

  filename: (req, file, callback) => {
    const filename = `${Date.now()}-${file.originalname}`;

    callback(null, filename);
  },
});

@Controller('chambre')
export class ChambreController {
  constructor(private readonly chambreService: ChambreService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
      ],
      {
        storage: chambreImageStorage,
      },
    ),
  )
  async create(
    @Body() createChambreDto: CreateChambreDto,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File[];
      image2?: Express.Multer.File[];
      image3?: Express.Multer.File[];
      image4?: Express.Multer.File[];
    },
  ): Promise<Chambre> {
    return await this.chambreService.create(
      createChambreDto,
      files.image1?.[0],
      files.image2?.[0],
      files.image3?.[0],
      files.image4?.[0],
    );
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
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image1', maxCount: 1 },
        { name: 'image2', maxCount: 1 },
        { name: 'image3', maxCount: 1 },
        { name: 'image4', maxCount: 1 },
      ],
      {
        storage: chambreImageStorage,
      },
    ),
  )
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateChambreDto: UpdateChambreDto,
    @UploadedFiles()
    files: {
      image1?: Express.Multer.File[];
      image2?: Express.Multer.File[];
      image3?: Express.Multer.File[];
      image4?: Express.Multer.File[];
    },
  ): Promise<Chambre> {
    return this.chambreService.update(
      id,
      updateChambreDto,
      files.image1?.[0],
      files.image2?.[0],
      files.image3?.[0],
      files.image4?.[0],
    );
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
