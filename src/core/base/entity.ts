import { randomUUID } from 'node:crypto';

// Base entity class for all entities in the domain layer to extend
// This class is responsible for generating a unique id for each entity
// This id is used as the primary key in the database

export class Entity {
  private readonly id: string;

  constructor() {
    this.id = randomUUID();
  }

  public getId() {
    return this.id;
  }
}
