import { Entity } from '../../core/base/entity';

// Define the interface for the repository

export abstract class IRepository<TEntity extends Entity, TFilter, TResponse> {
  abstract find(filter: TFilter): Promise<TResponse[]>;
  abstract save(entity: TEntity): Promise<TResponse>;
  // abstract update(id: string, data: Partial<TEntity>): Promise<TResponse>;
  abstract delete(id: string): Promise<TResponse>;
}
