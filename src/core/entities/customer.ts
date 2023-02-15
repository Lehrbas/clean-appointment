import { Entity } from '../base/entity';

interface ICustomerProps {
  name: string;
  userId?: string;
}

export class Customer extends Entity {
  constructor(private readonly props: ICustomerProps) {
    super();
  }

  public getName() {
    return this.props.name;
  }

  public getUserId() {
    return this.props.userId;
  }
}
