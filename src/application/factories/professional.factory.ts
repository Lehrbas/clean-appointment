// Implementation of factory for entity Professional

import { Professional } from '../../core/entities';
import { CreateProfessionalDTO } from '@/shared/dtos';

export class ProfessionalFactory {
  public static create(data: CreateProfessionalDTO): Professional {
    const { name, field, userId } = data;
    return new Professional({
      name,
      field,
      userId,
    });
  }
}
