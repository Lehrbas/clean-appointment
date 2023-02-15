import { Entity } from '../base/entity';

interface IAppointmentProps {
  startsAt: Date;
  endsAt: Date;
  status: string;
  professionalId: string;
  customerId: string;
}

export class Appointment extends Entity {
  constructor(private props: IAppointmentProps) {
    super();
  }

  public getStartsAt() {
    return this.props.startsAt;
  }

  public getEndsAt() {
    return this.props.endsAt;
  }

  public getStatus() {
    return this.props.status;
  }

  public getProfessionalId() {
    return this.props.professionalId;
  }

  public getCustomerId() {
    return this.props.customerId;
  }
}
