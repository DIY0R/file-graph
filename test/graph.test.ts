import assert from 'node:assert';
import { describe, it } from 'node:test';
import { FileGraph, uuidType } from 'lib';

const graph = FileGraph('data.txt');
const data = { name: 'Diy0r', age: new Date().toString() };
let globId = '';

describe('Vertex CRUD Operations', () => {
  it('create a vertex and find it by ID', async () => {
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

  it('update the vertex name', async () => {
    const isUpdated = await graph.updateVertex<typeof data>(vertex =>
      vertex.id === globId ? { data: { name: 'Dupo' } } : null,
    );
    assert.strictEqual(isUpdated, true);
  });

  it('verify the updated vertex name', async () => {
    const foundVertex = await graph.findOne<typeof data>(
      vertex => vertex.id === globId,
    );

    assert.strictEqual(foundVertex?.data.name, 'Dupo');
  });

  it('create a vertex and delete it', async () => {
    const createdVertexId = await graph.createVertex(data);
    const deleteVertex = await graph.deleteVertex<typeof data>(
      vertex => vertex.id === createdVertexId,
    );

    assert.equal(deleteVertex, true);
  });
});

describe('Arc operations', () => {
  let createdVertexId: uuidType;

  async function createVertexAndArc() {
    createdVertexId = await graph.createVertex(data);
    return graph.createArc(globId as uuidType, createdVertexId);
  }

  async function checkArcPresence(expected: boolean) {
    const foundVertex = await graph.findOne<typeof data>(
      vertex => vertex.id === globId,
    );
    assert.equal(
      foundVertex.arcs.includes(createdVertexId),
      expected,
      `Arc ${expected ? 'not ' : ''}found in vertex`,
    );
  }

  it(' create an arc between two vertices', async () => {
    const newArcCreated = await createVertexAndArc();

    assert.equal(newArcCreated, true, 'Arc creation failed');
    await checkArcPresence(true);
  });

  it(' remove an arc between two vertices', async () => {
    await createVertexAndArc();
    const removedArc = await graph.removeArc(
      globId as uuidType,
      createdVertexId,
    );

    assert.equal(removedArc, true, 'Arc removal failed');
    await checkArcPresence(false);
  });
});
