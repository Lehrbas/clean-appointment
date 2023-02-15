import { Entity } from '../base/entity';

export interface IUserProps {
  email: string;
  password: string;
  role: string;
}

export class User extends Entity {
  constructor(private readonly props: IUserProps) {
    super();
  }

  public getEmail() {
    return this.props.email;
  }

  public getPassword() {
    return this.props.password;
  }

  public getRole() {
    return this.props.role;
  }
}
