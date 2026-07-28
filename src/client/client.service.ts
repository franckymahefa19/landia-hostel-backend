import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { Repository } from 'typeorm';
import { Client } from './entities/client.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(Client)
    private clientRepository: Repository<Client>,
  ) {}

  async create(createClientDto: CreateClientDto): Promise<Client> {
    return await this.clientRepository.save(createClientDto);
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

  async update(id: number, updateClientDto: UpdateClientDto) {
    const client = await this.clientRepository.preload({
      id: id,
      ...updateClientDto,
    });

    if (!client) {
      throw new NotFoundException(`Le client avec l'ID #${id} est introuvable`);
    }

    return this.clientRepository.save(client);
  }

  remove(id: number) {
    this.clientRepository.delete(id);
    return `le client d'id ${id} a été supprimé !`;
  }

  async softremove(id: number) {
    const result = await this.clientRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Le client avec l'ID #${id} est introuvable`);
    }
    return `le client d'id ${id} a été désactivé !`;
  }

  async restore(id: number) {
    const result = await this.clientRepository.restore(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Le client avec l'ID #${id} est introuvable ou il n'a pas été désactivé`);
    }
    return `le client d'id ${id} a été restoré !`;
  }
}
