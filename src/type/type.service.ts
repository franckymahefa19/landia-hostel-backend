import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Type } from './entities/type.entity';

@Injectable()
export class TypeService {

  constructor(
    @InjectRepository(Type)
    private readonly typeRepository: Repository<Type>
  ){}

  async create(createTypeDto: CreateTypeDto): Promise<Type> {
    return await this.typeRepository.save(createTypeDto);
  }

  async findAll(): Promise<Type[]> {
    return await this.typeRepository.find()
  }

  async findOne(id: number): Promise<Type> {
    const type = await this.typeRepository.findOneBy({id})
    if(!type){
      throw new NotFoundException(`le type de chambre ${id} est introuvable !`)
    }
    return type
  }

  async update(id: number, updateTypeDto: UpdateTypeDto): Promise<Type> {
    const type = await this.typeRepository.preload({id, ...updateTypeDto});
     if(!type){
      throw new NotFoundException(`le type de chambre ${id} est introuvable !`)
    }
    return await this.typeRepository.save(type)
  }

  async remove(id: number) {
    await this.typeRepository.delete(id)
    return `Le type de chambre ${id} a été supprimé !`;
  }

  async softremove(id: number){
    const response = await this.typeRepository.softDelete(id)
    if(response.affected === 0){
      throw new NotFoundException(`le type de chambre ${id} est introuvable !`)
    }
    return `Le type de chambre ${id} a été désactivé !`;
  }

  async restore(id: number){
    const response = await this.typeRepository.restore(id)
    if(response.affected === 0){
      throw new NotFoundException(`le type de chambre ${id} est introuvable ou n'a pas été désactivé !`)
    }
    return `Le type de chambre ${id} a été restoré !`;
  }
}
