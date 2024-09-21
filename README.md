# FileGraph- Graph Operations API

[![version](https://img.shields.io/npm/v/file-graph.svg)](https://www.npmjs.com/package/file-graph)
[![npm downloads](https://img.shields.io/npm/dt/file-graph.svg)](https://www.npmjs.com/package/file-graph)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-yellow)](https://www.jsdocs.io/package/file-graph)
[![license](https://badgen.net/npm/license/file-graph)](https://www.npmjs.com/package/file-graph)
[![Testing CI](https://github.com/DIY0R/file-graph/actions/workflows/checker.yaml/badge.svg?branch=main)](https://github.com/DIY0R/file-graph/actions/workflows/checker.yaml)

The `file-graph` class provides an abstract implementation for graph operations. It supports graph manipulation, including creating, updating, and deleting vertices, creating arcs and edges, and traversing or querying the graph structure.

---

# Installation

```bash
npm install file-graph
```

Alternatively, you can install it from the GitHub registry:

```bash
npm install @diy0r/file-graph
```

## Creating a Graph Instance

```ts
const graph = FileGraph('../graph.txt');
```

`FileGraph` accepts a path where the graph data will be stored. The graph object returned is an instance of the `FileGraphAbstract` class, which provides methods for manipulating the graph. You can refer to the [jsDoc documentation](https://www.jsdocs.io/package/file-graph) documentation for more details.

## File Structure

After initializing the graph at the specified path, a file will be created where each line represents a vertex. It is recommended not to modify the file contents manually.

Example of a vertex record:

```json
{
  "id": "33ef29be-adaa-4509-b306-62a32db7310e", // UUID - unique identifier of the vertex
  "data": { ... }, // The data associated with the vertex
  "links": [] // List of UUIDs of vertices that this vertex is connected to
}
```

## Public API - Asynchronous Methods

Below is an overview of the methods, their parameters, return values, and examples of how to use them.

### `createVertex<T extends object>(data: T): Promise<IVertex<T>>`

Creates a vertex (node) in the graph with the provided data.

- **Parameters**:
  - `data: T` - An object representing the vertex data.
- **Returns**:
  - A promise that resolves to the created vertex object `{ id, data, links }`.

#### Example:

```typescript
const data = { name: 'Alice', age: 30 };
const createdVertex = await graph.createVertex(data);
console.log(createdVertex);
// Output: { id: 'some-unique-id', data: { name: 'Alice', age: 30 }, links: [] }
```

---

### `createVertices<T extends object>(data: T[]): Promise<IVertex<T>[]>`

Creates multiple vertices at once.

- **Parameters**:
  - `data: T[]` - An array of objects representing the data for each vertex.
- **Returns**:
  - A promise that resolves to an array of created vertex objects.

#### Example:

```typescript
const data = [{ name: 'Alice' }, { name: 'Bob' }];
const createdVertices = await graph.createVertices(data);
console.log(createdVertices);
// Output: [{ id: 'id1', data: { name: 'Alice' }, links: [] }, { id: 'id2', data: { name: 'Bob' }, links: [] }]
```

---

### `updateVertex<T extends object>(updater: IUpdater<T>): Promise<boolean>`

Updates a vertex that matches the given condition. The updater function defines the logic for finding and modifying the vertex.

- **Parameters**:
  - `updater: IUpdater<T>` - A function that takes a vertex and returns an updated vertex if it matches the condition.
- **Returns**:
  - A promise that resolves to `true` if the update was successful, otherwise `false`.

#### Example:

```typescript
const isUpdated = await graph.updateVertex(
  vertex =>
    vertex.id === 'some-unique-id' && { data: { name: 'Alice Updated' } },
);
console.log(isUpdated); // true
```

---

### `deleteVertex<T extends object>(predicate: IPredicate<T>): Promise<boolean>`

Deletes a vertex that matches the given condition.

- **Parameters**:
  - `predicate: IPredicate<T>` - A function that returns `true` if the vertex should be deleted.
- **Returns**:
  - A promise that resolves to `true` if the deletion was successful, otherwise `false`.

#### Example:

```typescript
const isDeleted = await graph.deleteVertex(
  vertex => vertex.id === 'some-unique-id',
);
console.log(isDeleted); // true
```

---

### `findOne<T extends object>(predicate: IPredicate<T>): Promise<IVertex<T> | null>`

Finds a single vertex that matches the given condition.

- **Parameters**:
  - `predicate: IPredicate<T>` - A function that returns `true` if the vertex matches the search condition.
- **Returns**:
  - A promise that resolves to the matching vertex object, or `null` if no match is found.

#### Example:

```typescript
const foundVertex = await graph.findOne(vertex => vertex.data.name === 'Alice');
console.log(foundVertex);
// Output: { id: 'some-unique-id', data: { name: 'Alice', age: 30 }, links: [] }
```

---

### `findAll<T extends object>(predicate: IPredicate<T>): Promise<IVertex<T>[]>`

Finds all vertices that match the given condition.

- **Parameters**:
  - `predicate: IPredicate<T>` - A function that returns `true` for each vertex that matches the search condition.
- **Returns**:
  - A promise that resolves to an array of matching vertex objects.

#### Example:

```typescript
const foundVertices = await graph.findAll(
  vertex => vertex.data.name === 'Alice',
);
console.log(foundVertices);
// Output: [{ id: 'id1', data: { name: 'Alice', age: 30 }, links: [] }, { id: 'id2', data: { name: 'Alice', age: 25 }, links: [] }]
```

---

### `forEachVertex<T extends object>(callbackVertex: ICallbackVertex<T>): Promise<void>`

Iterates over each vertex in the graph and applies the provided callback function.

- **Parameters**:
  - `callbackVertex: ICallbackVertex<T>` - A callback function that is invoked for each vertex. If it returns `true`, the iteration stops.
- **Returns**:
  - A promise that resolves when the iteration is complete.

#### Example:

```typescript
await graph.forEachVertex(vertex => {
  console.log(vertex);
  // Stop iteration if the vertex's name is 'Alice'
  return vertex.data.name === 'Alice';
});
```

---

### `createEdge(ids: IUuidArray): Promise<boolean>`

Creates edges (links) between the specified vertices.

- **Parameters**:
  - `ids: IUuidArray` - An array of vertex IDs between which to create edges.
- **Returns**:
  - A promise that resolves to `true` if the edge creation was successful.

#### Example:

```typescript
const isEdgeCreated = await graph.createEdge(['id1', 'id2', 'id3']);
console.log(isEdgeCreated); // true
```

---

### `createArc(sourceVertexId: uuidType, targetVertexId: uuidType): Promise<boolean>`

Creates an arc (directed edge) between two vertices.

- **Parameters**:
  - `sourceVertexId: uuidType` - The ID of the source vertex.
  - `targetVertexId: uuidType` - The ID of the target vertex.
- **Returns**:
  - A promise that resolves to `true` if the arc creation was successful.

#### Example:

```typescript
const isArcCreated = await graph.createArc('id1', 'id2');
console.log(isArcCreated); // true
```

---

### `createArcs(ids: IUuidArray): Promise<boolean>`

Creates arcs (directed edges) between multiple vertices in the specified order.

- **Parameters**:
  - `ids: IUuidArray` - An array of vertex IDs.
- **Returns**:
  - A promise that resolves to `true` if the arcs creation was successful.

#### Example:

```typescript
const isArcsCreated = await graph.createArcs(['id1', 'id2', 'id3']);
console.log(isArcsCreated); // true
```

---

### `removeArc(sourceVertexId: uuidType, targetVertexId: uuidType): Promise<boolean>`

Removes an arc (edge) between two vertices.

- **Parameters**:
  - `sourceVertexId: uuidType` - The ID of the source vertex.
  - `targetVertexId: uuidType` - The ID of the target vertex.
- **Returns**:
  - A promise that resolves to `true` if the arc was successfully removed.

#### Example:

```typescript
const isArcRemoved = await graph.removeArc('id1', 'id2');
console.log(isArcRemoved); // true
```

---

### `hasArc(sourceVertexId: uuidType, targetVertexId: uuidType): Promise<boolean>`

Checks if an arc exists between two vertices.

- **Parameters**:
  - `sourceVertexId: uuidType` - The ID of the source vertex.
  - `targetVertexId: uuidType` - The ID of the target vertex.
- **Returns**:
  - A promise that resolves to `true` if the arc exists, otherwise `false`.

#### Example:

```typescript
const hasArc = await graph.hasArc('id1', 'id2');
console.log(hasArc); // true or false
```

---

### `findUpToLevel<T extends object>(vertexId: uuidType, maxLevel?: number): Promise<IVertexTree<T>[]>`

Retrieves vertices up to a specified depth level from a starting vertex.

- **Parameters**:
  - `vertexId: uuidType` - The ID of the starting vertex.
  - `maxLevel?: number` - (Optional) The depth level to limit the search.
- **Returns**:
  - A promise that resolves to an array of vertices up to the specified level.

#### Example:

```typescript
const graphTree = await graph.findUpToLevel('id1', 2);
console.log(graphTree);
/* Output: [
{ id: 'id1',data:{...},links:[...],level: 0 }, 
{ id: 'id2',data:{...},links:[...], level: 1 }, 
{ id: 'id3', data:{...},links:[...],level: 2 }
 ];  */
```

---

### `searchVerticesFrom<T extends object>(vertexId: uuidType, predicate: IPredicate<T>): Promise<IVertex<T>[]>`

Performs a search starting from the given vertex and returns vertices that match the predicate.

- **Parameters**:
  - `vertexId: uuidType` - The ID of the starting vertex.
  - `predicate: IPredicate<T>` - A function used to evaluate each vertex. Only vertices that satisfy the predicate will be returned.
- **Returns**:
  - A promise that resolves to an array of matching vertices.

#### Example:

```typescript
const matchingVertices = await graph.searchVerticesFrom(
  'id1',
  vertex => vertex.data.age > 25,
);
console.log(matchingVertices);
// Output: [{ id: 'id2', data: { name: 'Alice', age: 30 }, links: [] }]
```

---

### `hasPath(sourceVertexId: uuidType, targetVertexId: uuidType): Promise<boolean>`

Checks if a path exists between two vertices using Depth-First Search (DFS).

- **Parameters**:
  - `sourceVertexId: uuidType` - The ID of the source vertex.
  - `targetVertexId: uuidType` - The ID of the target vertex.
- **Returns**:
  - A promise that resolves to `true` if a path exists between the vertices, otherwise `false`.

#### Example:

```typescript
const pathExists = await graph.hasPath('id1', 'id3');
console.log(pathExists); // true or false
```

---

This abstract class provides the blueprint for interacting with a graph structure, supporting both simple and complex operations for managing vertices and their relationships. Concrete implementations should define the behavior for storing and retrieving graph data.
