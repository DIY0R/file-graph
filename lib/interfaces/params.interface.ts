import { UUID } from 'crypto';

export interface IVertex {
  id: UUID;
}
export type uuidType = UUID;

export type IPredicate<T extends object> = (vertex: T & IVertex) => boolean;
export type IUpdater<T extends object> = (
  vertex: T & IVertex,
) => (T & IVertex) | object;
