import { uuidType } from '../interfaces';

const ERRORS = {
  VERTEX_NOT_FOUND: (id: uuidType) => `Vertex with id ${id} not found.`,
  MISSING_TRANSMITTED_VERTICES:
    'Some of the transmitted vertices are missing in the graph.',
  TARGET_VERTEX_NOT_FOUND: (id: uuidType) =>
    `Target vertex with ID "${id}" not found.`,
  TARGET_VERTEX_DOES_NOT_EXIST: (targetId: uuidType, sourceId: uuidType) =>
    `targetVertexId: ${targetId} don't exist in vertex ${sourceId}`,
  TARGET_VERTEX_ALREADY_EXISTS: (targetId: uuidType, sourceId: uuidType) =>
    `targetVertexId: ${targetId} already exists in vertex ${sourceId}`,
  NEGATIVE_LEVEL: 'Level must be a non-negative integer.',
};

const createError = (type: keyof typeof ERRORS, ...args: any[]) => {
  const errorTemplate: string | ((...args: any[]) => string) = ERRORS[type];
  if (!errorTemplate) throw new Error('Unknown error type');
  return new Error(
    typeof errorTemplate === 'function'
      ? errorTemplate(...args)
      : errorTemplate,
  );
};

export { createError };
