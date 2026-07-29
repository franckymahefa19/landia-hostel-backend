import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Facture } from './entities/facture.entity';
import { Repository } from 'typeorm';
import { CreateFactureDto } from './dto/create-facture.dto';
import { UpdateFactureDto } from './dto/update-facture.dto';

@Injectable()
export class FactureService {
  constructor(
      @InjectRepository(Facture)
      private factureRepository: Repository<Facture>,
    ) {}
  
    async create(createFactureDto: CreateFactureDto): Promise<Facture> {
      return await this.factureRepository.save(createFactureDto);
    }
  
    async findAll(): Promise<Facture[]> {
      return await this.factureRepository.find();
    }
  
    async findOne(id: number): Promise<Facture> {
      const Facture = await this.factureRepository.findOneBy({ id });
      if (!Facture) {
        throw new NotFoundException(`Le facture d'id ${id} est introuvable !`);
      }
      return Facture;
    }
  
    async update(id: number, updateFactureDto: UpdateFactureDto) {
      const Facture = await this.factureRepository.preload({
        id: id,
        ...updateFactureDto,
      });
  
      if (!Facture) {
        throw new NotFoundException(`Le facture avec l'ID ${id} est introuvable`);
      }
  
      return this.factureRepository.save(Facture);
    }
  
    async remove(id: number) {
      await this.factureRepository.delete(id);
      return `le facture d'id ${id} a été supprimé !`;
    }
  
    async softremove(id: number) {
      const result = await this.factureRepository.softDelete(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Le Facture avec l'ID ${id} est introuvable`);
      }
      return `le facture d'id ${id} a été désactivé !`;
    }
  
    async restore(id: number) {
      const result = await this.factureRepository.restore(id);
      if (result.affected === 0) {
        throw new NotFoundException(`Le facture avec l'ID ${id} est introuvable ou il n'a pas été désactivé`);
      }
      return `le facture d'id ${id} a été restoré !`;
    }
}
