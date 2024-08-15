import assert from 'node:assert';
import { describe, it } from 'node:test';
import { FileGraph, uuidType } from 'lib';

const graph = FileGraph('data.txt');
const data = { name: 'Diy0r', age: new Date().toString() };
let globId = '';

describe('Vertex CRUD Operations', () => {
  it('should create a vertex and find it by ID', async () => {
    const createdVertexId = await graph.createVertex(data);
    const foundVertex = await graph.findOne<typeof data>(
      vertex => vertex.id === createdVertexId,
    );

    assert.deepStrictEqual(
      { id: createdVertexId, data, arcs: [] },
      foundVertex,
    );
    globId = createdVertexId;
  });

  it('should update the vertex name', async () => {
    const isUpdated = await graph.updateVertex<typeof data>(vertex =>
      vertex.id === globId ? { data: { name: 'Dupo' } } : null,
    );
    assert.strictEqual(isUpdated, true);
  });

  it('should verify the updated vertex name', async () => {
    const foundVertex = await graph.findOne<typeof data>(
      vertex => vertex.id === globId,
    );

    assert.strictEqual(foundVertex?.data.name, 'Dupo');
  });

  it('should create a vertex and delete it', async () => {
    const createdVertexId = await graph.createVertex(data);
    const deleteVertex = await graph.deleteVertex<typeof data>(
      vertex => vertex.id === createdVertexId,
    );

    assert.equal(deleteVertex, true);
  });
});

describe('Arc operations', () => {
  it('should create an arc between two vertices', async () => {
    const createdVertexId = await graph.createVertex(data);

    const newArcCreated = await graph.createArc(
      globId as uuidType,
      createdVertexId,
    );
    const foundVertex = await graph.findOne<typeof data>(
      vertex => vertex.id === globId,
    );

    assert.equal(newArcCreated, true, 'Arc creation failed');
    assert.equal(
      foundVertex.arcs.includes(createdVertexId),
      true,
      'Arc not found in vertex',
    );
  });
});
