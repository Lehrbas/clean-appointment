// Defines port for Professional repository

import { Professional } from '@/core/entities/professional';
import { ProfessionalDTO, ProfessionalFilterDTO } from '@/shared/dtos';
import { IRepository } from '../abstract/repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class IProfessionalRepository extends IRepository<
  Professional,
  ProfessionalFilterDTO,
  ProfessionalDTO
> {
  abstract getById(id: string): Promise<ProfessionalDTO>;
}
