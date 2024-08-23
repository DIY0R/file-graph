import { IPredicate, IUpdater, IVertex, uuidType } from './params.interface';

export abstract class FileGraphAbstract {
  /**
   * Creates a node in the graph.
   * @template T The date type from the node, which must match the type of the object.
   * @param {T} data - The data vertex for creating the node.
   * @returns {IVertex<T>} - created node.
   */
  public abstract createVertex<T extends object>(data: T): Promise<IVertex<T>>;

  /**
   * Creates multiple vertices in the graph.
   *
   * This method takes an array of vertices and creates them in the graph.
   *
   * @param {T[]} data - An array of data to be created.
   * @returns {Promise<uuidType[]>} A promise that resolves to an array of unique identifiers of the created vertices.
   */
  public abstract createVertices<T extends object>(
    data: T[],
  ): Promise<IVertex<T>[]>;

  /**
   * Updates a vertex record in the storage that matches the given condition.
   *
   * This method searches for a record that satisfies the condition specified by the `updater` function
   * and updates it by replacing the old record with the new one. The `updater` function should return the updated
   * vertex object if it matches the condition.
   *
   * @template T The date type from the node, which must match the type of the object.
   * @param {Function} updater A function that takes a vertex object {@link  IVertex<T>} and returns an updated vertex object {@link  IVertex<T>}.
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
   * @template T The date type from the node, which must match the type of the object.
   * @param {Function} predicate A function that takes a vertex object {@link T & IVertex} and returns `true` if the vertex should be deleted.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the record was successfully deleted, and `false` if the record was not found or an error occurred.
   */
  public abstract deleteVertex<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<boolean>;

  /**
   * Searches for a vertex in the storage file that matches the given predicate.
   * @template T The date type from the node, which must match the type of the object.
   * @param {function(T): boolean} predicate - A function that takes a vertex as input and returns `true` if the vertex matches the search criteria, otherwise `false`.
   * @returns {Promise<T | null>} A promise that resolves to the found vertex if a match is found, or `null` if no match is found.
   */
  public abstract findOne<T extends object>(
    predicate: IPredicate<T>,
  ): Promise<IVertex<T> | null>;

  /**
   * Creates an arc (edge) from one vertex to another in the graph.
   *
   * This method connects the vertex with the specified `sourceVertexId` to the vertex with the specified `targetVertexId`.
   * If the target vertex does not exist or the arc already exists, an error will be thrown.
   *
   * @param {uuidType} sourceVertexId - The ID of the vertex from which the arc originates.
   * @param {uuidType} targetVertexId - The ID of the vertex to which the arc points.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the arc was successfully created,
   *                              or `false` if the arc already exists.
   * @throws {Error} Throws an error if the target vertex does not exist or if an error occurs during the update.
   */
  public abstract createArc(
    sourceVertexId: uuidType,
    targetVertexId: uuidType,
  ): Promise<boolean>;

  /**
   * Removes an arc (edge) between two vertices in the graph.
   *
   * This method disconnects the vertex with the specified `sourceVertexId` from the vertex with the specified `targetVertexId`.
   * If the target vertex does not exist or the arc does not exist, an error will be thrown.
   *
   * @param {uuidType} sourceVertexId - The ID of the vertex from which the arc is to be removed.
   * @param {uuidType} targetVertexId - The ID of the vertex to which the arc points.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the arc was successfully removed,
   *                              or `false` if the arc does not exist.
   * @throws {Error} Throws an error if the target vertex does not exist or if an error occurs during the update.
   */
  public abstract removeArc(
    sourceVertexId: uuidType,
    targetVertexId: uuidType,
  ): Promise<boolean>;

  /**
   * Checks whether an arc (directed edge) exists between two vertices in the graph.
   *
   * This method determines if there is a connection from the vertex with the specified `sourceVertexId`
   * to the vertex with the specified `targetVertexId`.
   *
   * @param {uuidType} sourceVertexId - The ID of the vertex from which the arc originates.
   * @param {uuidType} targetVertexId - The ID of the vertex to which the arc points.
   * @returns {Promise<boolean>} A promise that resolves to `true` if the arc exists, `false` otherwise.
   */
  public abstract hasArc(
    sourceVertexId: uuidType,
    targetVertexId: uuidType,
  ): Promise<boolean>;
}
