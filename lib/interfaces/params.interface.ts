import { UUID } from 'crypto';
export type uuidType = UUID;

export interface IVertex<T extends object> {
  id: uuidType;
  arcs: Array<uuidType>;
  data: T;
}

export type IPredicate<T extends object> = (vertex: IVertex<T>) => boolean;
export type IUpdater<T extends object> = (vertex: IVertex<T>) => any;
