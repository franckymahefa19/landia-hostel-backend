import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { join } from 'path';
import { existsSync, unlinkSync } from 'fs';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(
    createClientDto: CreateClientDto,
    image?: Express.Multer.File,
  ): Promise<Client> {
    const client = await this.clientRepository.create({
      nationalite: createClientDto.nationalite,
      adresse: createClientDto.adresse,
      email: createClientDto.email,
      nom: createClientDto.nom,
      prenom: createClientDto.prenom,
      sexe: createClientDto.sexe,
      tel: createClientDto.tel,
      image: image ? `/uploads/clients/${image.filename}` : undefined,
    });
    return await this.clientRepository.save(client);
  }

  async paginatedFindAll(page = 1, limit = 10, search?: string) {
    const skip = (page - 1) * limit;

    const query = this.clientRepository.createQueryBuilder('client');

    if (search?.trim()) {
      query.where('(client.nom ILIKE :search)', {
        search: `%${search.trim()}%`,
      });
    }

    query.orderBy('client.createdAt', 'DESC').skip(skip).take(limit);

    const [clients, total] = await query.getManyAndCount();

    return {
      data: clients,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async findAll(): Promise<Client[]> {
    return await this.clientRepository.find();
  }

  async findOne(id: number): Promise<Client> {
    const client = await this.clientRepository.findOneBy({ id });
    if (!client) {
      throw new NotFoundException(`Le client d'id ${id} est introuvable !`);
    }
    return client;
  }

  async update(
    id: number,
    updateClientDto: UpdateClientDto,
    image?: Express.Multer.File,
  ) {
    const client = await this.clientRepository.preload({
      id: id,
      ...updateClientDto,
    });

    if (!client) {
      throw new NotFoundException(`Le client avec l'ID ${id} est introuvable`);
    }

    if (image) {
      if (client.image) {
        const oldImagePath = join(
          process.cwd(),
          client.image.replace(/^[/\\]+/, ''),
        );

        if (existsSync(oldImagePath)) {
          unlinkSync(oldImagePath);
        }
      }

      client.image = `/uploads/clients/${image.filename}`;
    }

    return this.clientRepository.save(client);
  }

  async remove(id: number) {
    const client = await this.findOne(id);
    if (client) {
      if (client.image) {
        const imagePath = join(process.cwd(), client.image);

        if (existsSync(imagePath)) {
          unlinkSync(imagePath);
        }
      }
    }
    await this.clientRepository.delete(id);
    return `le client d'id ${id} a été supprimé !`;
  }

  async softremove(id: number) {
    const result = await this.clientRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Le client avec l'ID ${id} est introuvable`);
    }
    return `le client d'id ${id} a été désactivé !`;
  }

  async restore(id: number) {
    const result = await this.clientRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(
        `Le client avec l'ID ${id} est introuvable ou il n'a pas été désactivé`,
      );
    }
    return `le client d'id ${id} a été restoré !`;
  }
}
