import { IVertex } from 'lib/interfaces';

export const mergeVertices = <T extends object>(
  vertex: IVertex<T>,
  updaterVertex: IVertex<T>,
) => ({
  ...vertex,
  ...updaterVertex,
  data: {
    ...vertex.data,
    ...updaterVertex.data,
  },
});
