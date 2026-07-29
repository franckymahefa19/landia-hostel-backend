import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePaiementDto } from './dto/create-paiement.dto';
import { UpdatePaiementDto } from './dto/update-paiement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Paiement } from './entities/paiement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaiementService {

  constructor(
      @InjectRepository(Paiement)
      private readonly paiementRepository: Repository<Paiement>
    ){}
  

  async create(createPaiementDto: CreatePaiementDto): Promise<Paiement> {
    return await this.paiementRepository.save(createPaiementDto);
  }

  async findAll(): Promise<Paiement[]> {
    return await this.paiementRepository.find()
  }

  async findOne(id: number): Promise<Paiement> {
    const paiement = await this.paiementRepository.findOneBy({id})
    if(!paiement){
      throw new NotFoundException(`le paiement d'id ${id} est introuvable !`);
    }
    return paiement;
  }

  async update(id: number, updatePaiementDto: UpdatePaiementDto): Promise<Paiement> {
     const paiement = await this.paiementRepository.preload({id, ...updatePaiementDto})
     if(!paiement){
      throw new NotFoundException(`le paiement d'id ${id} est introuvable !`);
    }
    return await this.paiementRepository.save(paiement)
  }

  async softremove(id: number) {
    const response = await this.paiementRepository.softDelete(id);
    if(response.affected === 0){
      throw new NotFoundException(`le paiement d'id ${id} est introuvable !`);
    }
    return `le paiement d'id ${id} a été désactivé avec succès !`
  }

  async restore(id: number) {
    const response = await this.paiementRepository.restore(id);
    if(response.affected === 0){
      throw new NotFoundException(`le paiement d'id ${id} est introuvable ou n'a pas été désactivé !`); 
    }
    return `le paiement d'id ${id} a été restoré avec succès !`
  }

  async remove(id: number) {
    await this.paiementRepository.delete(id);
    return `le paiement d'id ${id} a été supprimé avec succès !`
  }
}
