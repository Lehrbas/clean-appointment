// The validator in the service layer holds the logic for
//  guaranting that starts_at and ends_at are the same day

import { Entity } from '../base/entity';

interface IAvailabilityProps {
  startsAt: Date;
  endsAt: Date;
  professionalId: string;
}

export class Availability extends Entity {
  constructor(private props: IAvailabilityProps) {
    super();
  }

  public getStartsAt() {
    return this.props.startsAt;
  }

  public getEndsAt() {
    return this.props.endsAt;
  }

  public getProfessionalId() {
    return this.props.professionalId;
  }
}
