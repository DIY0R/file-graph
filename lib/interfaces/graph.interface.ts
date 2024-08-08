import crypto from 'crypto';
import { IVertex } from './params.interface';

export abstract class FileGraphAbstract {
  /**
   * Creates a node in the graph.
   * @template T - The type of the data model representing the node.
   * @param {T} model - The data model for creating the node.
   * @returns {crypto.UUID} - The unique identifier of the created node.
   */
  public abstract createVertex<T extends object>(
    model: T,
  ): Promise<crypto.UUID>;

  /**
   * Searches for a model in the storage file that matches the given predicate.
   *
   * @param {function(T): boolean} predicate - A function that takes a model as input and returns `true` if the model matches the search criteria, otherwise `false`.
   * @returns {Promise<T | null>} A promise that resolves to the found model if a match is found, or `null` if no match is found.
   */
  public abstract findOne<T extends object>(
    predicate: (model: T | IVertex) => boolean,
  ): Promise<object | null>;
}
