import {
  AvailabilityDTO,
  AvailabilityFilterDTO,
  CreateAvailabilityDTO,
  UpdateAvailabilityDTO,
} from '@/shared/dtos';
import { AvailabilityFactory } from '../factories';
import { IAvailabilityRepository } from '../ports/availabilities.repository.port';
import { ProfessionalService } from './professional.service';
import { Injectable } from '@nestjs/common';
import { Availability } from '@/core/entities';

@Injectable()
export class AvailabilityService {
  constructor(
    private readonly availabilitiesRepository: IAvailabilityRepository,
    private readonly professionalService: ProfessionalService,
  ) {}

  // Availabilities are created by a professional, so we need to check if the professional exists on database
  // before creating the availability, also we need to check if the availability is not already created
  // for the same professional and time range

  public async add(data: CreateAvailabilityDTO): Promise<AvailabilityDTO[]> {
    try {
      const professional = await this.professionalService.find({
        id: data.professionalId,
      });

      if (professional == undefined || professional.length == 0) {
        throw Error('Professional id does not exist on database');
      }

      const availabilities: Availability[] = [];

      // We need to create an availability for each time range on the array availabilities of the DTO
      for (const availability of data.availabilities) {
        const availabilityAlreadyExists =
          await this.availabilitiesRepository.find({
            professionalId: data.professionalId,
            // We check if exists an availability with the same startsAt, we do not need to check if the endsAt is the same
            // because the availability can be created with a different endsAt
            startsAt: availability[0],
          });

        if (availabilityAlreadyExists.length > 0) {
          throw Error('Availability already exists on database');
        }

        // Create each availability and push it to the array of availabilities to be
        // passed to the saveMany method of the repository to be saved on database in bulk

        const availabilityEntity = AvailabilityFactory.create({
          startsAt: availability[0],
          endsAt: availability[1],
          professionalId: data.professionalId,
        });

        availabilities.push(availabilityEntity);
      }

      return await this.availabilitiesRepository.saveMany(availabilities);
    } catch (error) {
      throw error;
    }
  }

  public async update(data: UpdateAvailabilityDTO): Promise<AvailabilityDTO> {
    return await this.availabilitiesRepository.update(data);
  }

  public async find(filter: AvailabilityFilterDTO): Promise<AvailabilityDTO[]> {
    return await this.availabilitiesRepository.find(filter);
  }

  public async delete(id: string): Promise<AvailabilityDTO> {
    return await this.availabilitiesRepository.delete(id);
  }
}
