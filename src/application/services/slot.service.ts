import {
  AppointmentDTO,
  AvailabilityDTO,
  ProfessionalDTO,
  SlotsDTO,
  SlotsResponseDTO,
} from '@/shared/dtos';
import { Injectable } from '@nestjs/common';
import { startOfToday, format, isBefore, addMinutes } from 'date-fns';
import { utcToZonedTime } from 'date-fns-tz';
import { IAvailabilityRepository } from '../ports';
import { AppointmentService } from './appointment.service';
import { ProfessionalService } from './professional.service';

@Injectable()
export class SlotService {
  constructor(
    private availabilitiesRepository: IAvailabilityRepository,
    private professionalService: ProfessionalService,
    private appointmentsService: AppointmentService,
  ) {}

  /* 
    Returns a formatted response for slots
      if a professional has a availability that start at 06:00am and ends at 12:00
      then the slots returned must be ['06:00', '06:30', ... 11:00]
      it must stop at 11:00, because each appointment takes 1 hour
      so an appointment at 11:30 would not be valid
    So it needs to check all availabilities from today start of the day Date forward for the passed professionalId in the filter param
      and then it gets the startsAt and endsAt of each availabilty and then it loops through each hour and adds it to the slots array 
      if it is not already there and if it is not in the appointments array or 30 minutes before the appointment starts
    The return should be
    { professionalId: professionalId, slots: { '2022-03-04': ['06:00', '06:30', ...], '2022-03-05': [] } }
*/

  public async findSlots(filter: SlotsDTO): Promise<SlotsResponseDTO> {
    try {
      const professional = await this.findProfessional(filter.professionalId);

      const availabilities = await this.findAvailabilities(professional.id);

      const appointments = await this.findAppointments(
        professional.id,
        filter.startsAt,
      );

      // Initialize an object to store the slots
      const slotsList: SlotsResponseDTO = {
        professionalId: filter.professionalId,
        slots: {},
      };

      // Loop through each availability
      for (const availability of availabilities) {
        const uniqueSlots = this.initializeUniqueSlotsSet();

        const [start, end] = this.getAvailabilityStartAndEndTime(availability);

        this.processAvailabilitySlots(
          start,
          end,
          uniqueSlots,
          slotsList,
          appointments,
        );
      }
      // Return the list of slots
      return slotsList;
    } catch (error) {
      // If an error occurs, throw the error
      throw error;
    }
  }

  private async findProfessional(
    professionalId: string,
  ): Promise<ProfessionalDTO> {
    const professional = await this.professionalService.getById(professionalId);

    // If no professional is found or the array is empty, throw an error
    if (professional === undefined) {
      throw new Error('Professional Id does not exist on database');
    }
    return professional;
  }

  private async findAvailabilities(professionalId: string) {
    const availabilities = await this.availabilitiesRepository.find({
      professionalId,
    });

    if (availabilities === undefined || availabilities.length === 0) {
      throw new Error('No availabilities found for this professional');
    }

    return availabilities;
  }

  private async findAppointments(professionalId: string, startsAt: Date) {
    const appointments = await this.appointmentsService.find({
      professionalId,
      status: 'AW' || 'IP',
      startsAt: startsAt || startOfToday(),
    });

    if (appointments === undefined || appointments.length === 0) {
      throw new Error('No appointments found for this professional');
    }

    return appointments;
  }

  private initializeUniqueSlotsSet(): Set<string> {
    return new Set();
  }

  private getAvailabilityStartAndEndTime(availability: AvailabilityDTO) {
    const start = availability.startsAt;
    const end = availability.endsAt;
    return [start, end];
  }

  private processAvailabilitySlots(
    start: Date,
    end: Date,
    uniqueSlots: Set<string>,
    slotsList: SlotsResponseDTO,
    appointments: AppointmentDTO[],
  ): void {
    // Loop through each 30 minute time slot within the availability
    while (start.getTime() < end.getTime()) {
      // Get the date of the current time slot
      const date = format(start, 'yyyy-MM-dd');
      // Get the current time slot in the format 'hh:mm'
      const slot = this.formatInTimeZone(start, 'kk:mm', 'UTC');

      // If the slot is unique, within the availability and there is not already a slot with the same time in the same date
      if (!uniqueSlots.has(slot) && !slotsList.slots[date]?.includes(slot)) {
        uniqueSlots.add(slot);

        // If the date is not already in the slotsList, add it as a key with an empty array value
        if (!slotsList.slots[date]) {
          slotsList.slots[date] = [];
        }

        const isSlotTaken = this.checkIfSlotIsTaken(
          slot,
          date,
          start,
          appointments,
        );

        // If the slot is already taken by an appointment , continue to the next loop iteration
        if (isSlotTaken) {
          continue;
        }

        // Add the slot to the list of slots for the current date if its not the last 30 minutes of the availability
        if (end.getTime() - start.getTime() > 30 * 60 * 1000) {
          slotsList.slots[date].push(slot);
        }
      }

      // Sort the slots for the current date
      slotsList.slots[date].sort();

      // Increment the time by 30 minutes for the next loop iteration
      start.setMinutes(start.getMinutes() + 30);
    }
  }

  private checkIfSlotIsTaken(
    slot: string,
    date: string,
    start: Date,
    appointments: AppointmentDTO[],
  ): boolean {
    // Check if the slot is already taken by an appointment
    return appointments.some((appointment) => {
      const appointmentDate = format(appointment.startsAt, 'yyyy-MM-dd');
      const appointmentSlot = this.formatInTimeZone(
        appointment.startsAt,
        'kk:mm',
        'UTC',
      );

      // If the current slot is the same as the appointment slot and the current date is the same as the appointment date, return true
      // If the current slot is before the appointment slot and the current date is the same as the appointment date, return true
      // If the appointment start is not the same as the availability start and the current slot is before the appointment start
      //  and the current date is the same as the appointment date, return true
      // If the current slot is 30 minutes before the start of an appointment return true

      return (
        (slot === appointmentSlot && date === appointmentDate) ||
        (isBefore(start, appointment.endsAt) &&
          !isBefore(start, addMinutes(appointment.startsAt, -30)) &&
          date === appointmentDate)
      );
    });
  }

  private formatInTimeZone(date: Date | number, fmt: string, tz): string {
    return format(utcToZonedTime(date, tz), fmt, tz);
  }
}
