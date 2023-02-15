import { Entity } from '../base/entity';

interface IProfessionalProps {
  name: string;
  field: string;
  userId?: string;
}

export class Professional extends Entity {
  constructor(private props: IProfessionalProps) {
    super();
  }

  public getName() {
    return this.props.name;
  }

  public getField() {
    return this.props.field;
  }

  public getUserId() {
    return this.props.userId;
  }
}
