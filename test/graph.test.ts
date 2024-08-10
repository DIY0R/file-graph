import assert from 'node:assert';
import { describe, it } from 'node:test';
import { FileGraph } from 'lib';

const graph = FileGraph('data.txt');
const myVertex = { name: 'Diy0r', age: new Date().toString() };
let globId = '';

describe('FileGraph CRUD Operations', () => {
  it('should create a vertex and find it by ID', async () => {
    const createdVertexId = await graph.createVertex(myVertex);
    const foundVertex = await graph.findOne<typeof myVertex>(
      vertex => vertex.id === createdVertexId,
    );

    assert.deepStrictEqual({ id: createdVertexId, ...myVertex }, foundVertex);
    globId = createdVertexId;
  });

  it('should update the vertex name', async () => {
    const isUpdated = await graph.updateVertex<typeof myVertex>(vertex =>
      vertex.id === globId ? { ...vertex, name: 'Dupo' } : null,
    );

    assert.strictEqual(isUpdated, true);
  });

  it('should verify the updated vertex name', async () => {
    const foundVertex = await graph.findOne<typeof myVertex>(
      vertex => vertex.id === globId,
    );

    assert.strictEqual(foundVertex?.name, 'Dupo');
  });

  it('should create a vertex and delete it', async () => {
    const createdVertexId = await graph.createVertex(myVertex);
    const deleteVertex = await graph.deleteVertex<typeof myVertex>(
      vertex => vertex.id === createdVertexId,
    );

    assert.equal(deleteVertex, true);
  });
});
