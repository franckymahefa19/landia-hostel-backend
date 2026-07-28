import { Injectable } from '@nestjs/common';
import { CreateChambreDto } from './dto/create-chambre.dto';
import { UpdateChambreDto } from './dto/update-chambre.dto';

@Injectable()
export class ChambreService {
  create(createChambreDto: CreateChambreDto) {
    return 'This action adds a new chambre';
  }

  findAll() {
    return `This action returns all chambre`;
  }

  findOne(id: number) {
    return `This action returns a #${id} chambre`;
  }

  update(id: number, updateChambreDto: UpdateChambreDto) {
    return `This action updates a #${id} chambre`;
  }

  remove(id: number) {
    return `This action removes a #${id} chambre`;
  }
}
