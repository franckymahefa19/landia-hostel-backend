import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chambre } from './entities/chambre.entity';
import { Repository } from 'typeorm';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class ChambreService {
  constructor(
    @InjectRepository(Chambre)
    private readonly chambreRepository: Repository<Chambre>,
  ) {}

  async create(
    createChambreDto: CreateChambreDto,
    image1?: Express.Multer.File,
    image2?: Express.Multer.File,
    image3?: Express.Multer.File,
    image4?: Express.Multer.File,
  ): Promise<Chambre> {
    const chambre = await this.chambreRepository.create({
      description: createChambreDto.description,
      etat: createChambreDto.etat,
      nom: createChambreDto.nom,
      prix: createChambreDto.prix,
      type: createChambreDto.type,
      image1: image1 ? `/uploads/chambres/${image1.filename}` : undefined,
      image2: image2 ? `/uploads/chambres/${image2.filename}` : undefined,
      image3: image3 ? `/uploads/chambres/${image3.filename}` : undefined,
      image4: image4 ? `/uploads/chambres/${image4.filename}` : undefined,
    });
    return await this.chambreRepository.save(chambre);
  }

  async findAll(): Promise<Chambre[]> {
    return await this.chambreRepository.find();
  }

  async paginatedFindAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const query = this.chambreRepository.createQueryBuilder('chambre');

    if (search?.trim()) {
      query.where('(chambre.nom ILIKE :search)', {
        search: `%${search.trim()}%`,
      });
    }

    query.orderBy('chambre.createdAt', 'DESC').skip(skip).take(limit);

    const [chambres, total] = await query.getManyAndCount();

    return {
      data: chambres,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: number): Promise<Chambre> {
    const chambre = await this.chambreRepository.findOneBy({ id });
    if (!chambre) {
      throw new NotFoundException(`la chambre d'id ${id} est introuvable !`);
    }
    return chambre;
  }

  async update(
    id: number,
    updateChambreDto: UpdateChambreDto,
    image1?: Express.Multer.File,
    image2?: Express.Multer.File,
    image3?: Express.Multer.File,
    image4?: Express.Multer.File,
  ): Promise<Chambre> {
    const chambre = await this.chambreRepository.preload({
      id,
      ...updateChambreDto,
    });
    if (!chambre) {
      throw new NotFoundException(`la chambre d'id ${id} est introuvable !`);
    }

    const changeImage = (prop: any) => {
      if (chambre[prop]) {
        const oldImagePath = join(
          process.cwd(),
          chambre[prop].replace(/^[/\\]+/, ''),
        );
        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
        }
      }
      chambre[prop] = `/uploads/chambres/${prop.filename}`;
    };

    if (image1) changeImage(image1);
    if (image2) changeImage(image2);
    if (image3) changeImage(image3);
    if (image4) changeImage(image4);

    return await this.chambreRepository.save(chambre);
  }

  async softremove(id: number) {
    const response = await this.chambreRepository.softDelete(id);
    if (response.affected === 0) {
      throw new NotFoundException(`la chambre d'id ${id} est introuvable !`);
    }
    return `la chambre d'id ${id} a été désactivé avec succès !`;
  }

  async restore(id: number) {
    const response = await this.chambreRepository.restore(id);
    if (response.affected === 0) {
      throw new NotFoundException(
        `la chambre d'id ${id} est introuvable ou n'a pas été désactivé !`,
      );
    }
    return `la chambre d'id ${id} a été restoré avec succès !`;
  }

  async remove(id: number) {
    await this.chambreRepository.delete(id);
    return `la chambre d'id ${id} a été supprimé avec succès !`;
  }
}
