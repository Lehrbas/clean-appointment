import {
  ProfessionalDTO,
  ProfessionalFilterDTO,
  CreateProfessionalDTO,
} from '@/shared/dtos';
import { ProfessionalFactory } from '../factories';
import { IProfessionalRepository } from '../ports/professionals.repository.port';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ProfessionalService {
  constructor(private professionalsRepository: IProfessionalRepository) {}

  public async add(data: CreateProfessionalDTO): Promise<ProfessionalDTO> {
    return await this.professionalsRepository.save(
      ProfessionalFactory.create(data),
    );
  }

  public async find(filter: ProfessionalFilterDTO): Promise<ProfessionalDTO[]> {
    return await this.professionalsRepository.find(filter);
  }

  public async delete(id: string): Promise<ProfessionalDTO> {
    return await this.professionalsRepository.delete(id);
  }
}
