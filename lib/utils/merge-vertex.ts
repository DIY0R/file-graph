import { IVertex } from '../interfaces';

export const mergeVertices = <T extends object>(
  vertex: IVertex<T>,
  updaterVertex: IVertex<T> | Record<string, any>,
) => ({
  ...vertex,
  ...updaterVertex,
  data: {
    ...vertex.data,
    ...(updaterVertex?.data || {}),
  },
});
