# File-Graph

[![version](https://img.shields.io/npm/v/file-graph.svg)](https://www.npmjs.com/package/file-graph)
[![npm downloads](https://img.shields.io/npm/dt/file-graph.svg)](https://www.npmjs.com/package/file-graph)
[![jsDocs.io](https://img.shields.io/badge/jsDocs.io-reference-yellow)](https://www.jsdocs.io/package/file-graph)
[![license](https://badgen.net/npm/license/file-graph)](https://www.npmjs.com/package/file-graph)
[![Testing CI](https://github.com/DIY0R/file-graph/actions/workflows/checker.yaml/badge.svg?branch=main)](https://github.com/DIY0R/file-graph/actions/workflows/checker.yaml)

**file-graph** is a library for working with graphs using a file-based storage system. It provides functionality for creating, updating, deleting, and searching for graph vertices and edges, as well as for performing traversal and pathfinding operations within the graph.

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

`FileGraph` accepts a path where the graph data will be stored. The `graph` object returned is an instance of the `FileGraphAbstract` class, which provides methods for manipulating the graph. You can refer to the [jsDoc documentation](https://www.jsdocs.io/package/file-graph) for more details.

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

### Creating a Vertex

```ts
const data = { name: 'Diyor', city: 'New-York' };
const createdVertex = await graph.createVertex<typeof data>(data);
```

This method returns an instance of the created vertex.
