import { UUID } from 'crypto';
export type uuidType = UUID;

export interface IVertex<T extends object> {
  id: uuidType;
  links: Array<uuidType>;
  data: T;
}
export interface IVertexTree<T extends object> extends IVertex<T> {
  level: number;
}

export type IUuidArray = [uuidType, ...uuidType[]];
export type IPredicate<T extends object> = (vertex: IVertex<T>) => boolean;
export type ICallbackVertex<T extends object> = (
  vertex: IVertex<T>,
) => void | boolean;
export type IUpdater<T extends object> = (
  vertex: IVertex<T>,
) => IVertex<T> | object;
export type IFindVertex<T extends object> = (
  vertex: IVertex<T>,
) => IVertex<T> | void;
export type ILineReturn = (line: string) => Promise<any>;
