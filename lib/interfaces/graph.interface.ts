import crypto from 'crypto';

export abstract class FileGraphAbstract {
  /**
   * Creates a node in the graph.
   * @template T - The type of the data model representing the node.
   * @param {T} model - The data model for creating the node.
   * @returns {crypto.UUID} - The unique identifier of the created node.
   */
  public abstract createVertex<T extends object>(
    model: T,
  ): Promise<crypto.UUID>; /**
   * Finds a vertex by its unique identifier.
   *
   * @param {string} id - The unique identifier of the vertex.
   * @returns {Promise<Object|null>} A promise that resolves to the vertex object if found, or null if not found.
   */
  public abstract findById(id: crypto.UUID): Promise<object | null>;
}
