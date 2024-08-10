import { IPredicate, IUpdater, uuidType } from './params.interface';

export abstract class FileGraphAbstract {
  /**
   * Creates a node in the graph.
   * @template T - The type of the data vertex representing the node.
   * @param {T} vertex - The data vertex for creating the node.
   * @returns {crypto.UUID} - The unique identifier of the created node.
   */
  public abstract createVertex<T extends object>(vertex: T): Promise<uuidType>;

  /**
   * Searches for a vertex in the storage file that matches the given predicate.
   *
   * @param {function(T): boolean} predicate - A function that takes a vertex as input and returns `true` if the vertex matches the search criteria, otherwise `false`.
   * @returns {Promise<T | null>} A promise that resolves to the found vertex if a match is found, or `null` if no match is found.
   */
  public abstract findOne<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<object | null>;
  /**
   * Updates a vertex record in the storage that matches the given condition.
   *
   * This method searches for a record that satisfies the condition specified by the `updater` function
   * and updates it by replacing the old record with the new one. The `updater` function should return the updated
   * vertex object if it matches the condition.
   *
   * @template T The type of the vertex object, which must conform to the {@link IVertex} interface.
   * @param {Function} updater A function that takes a vertex object {@link T & IVertex} and returns an updated vertex object {@link T & IVertex}.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the record was successfully updated, and `false` if the record was not found or an error occurred.
   */
  public abstract updateVertex<T extends object>(
    updater: IUpdater<T>,
  ): Promise<boolean>;

  /**
   * Deletes a vertex record in the storage that matches the given condition.
   *
   * This method searches for a record that satisfies the condition specified by the `predicate` function
   * and deletes it if the condition is met. The `predicate` function should return `true` for the vertex
   * that needs to be deleted.
   *
   * @template T The type of the vertex object, which must conform to the {@link IVertex} interface.
   * @param {Function} predicate A function that takes a vertex object {@link T & IVertex} and returns `true` if the vertex should be deleted.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the record was successfully deleted, and `false` if the record was not found or an error occurred.
   */
  public abstract deleteVertex<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<boolean>;
}
