import assert from 'node:assert';
import { describe, it } from 'node:test';
import { FileGraph, uuidType } from 'lib';

const graph = FileGraph('data.txt');
const data = { name: 'Diy0r', age: new Date().toString() };
let globId = '' as uuidType;

describe('Vertex CRUD Operations', () => {
  it('create a vertex and find it by ID', async () => {
    const createdVertex = await graph.createVertex(data);
    const foundVertex = await graph.findOne<typeof data>(
      vertex => vertex.id === createdVertex.id,
    );

    assert.deepStrictEqual(
      { id: createdVertex.id, data, links: [] },
      foundVertex,
    );
    globId = createdVertex.id;
  });

  it('creates multiple vertices', async () => {
    const vertices = [{ name: 'Alex' }, { city: 'LA' }];
    const createdVertices = await graph.createVertices(vertices);
    assert.strictEqual(createdVertices.length, vertices.length);
    createdVertices.forEach((vertex, index) =>
      assert.deepEqual(vertex.data, vertices[index]),
    );
  });

  it('find all vertices matching a predicate', async () => {
    const vertices = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }];
    await graph.createVertices(vertices);
    const foundVertices = await graph.findAll<any>(
      vertex => vertex.data?.name === 'Alice',
    );

    foundVertices.forEach(vertex =>
      assert.strictEqual(vertex.data.name, 'Alice'),
    );
  });

  it('update the vertex name', async () => {
    const isUpdated = await graph.updateVertex<typeof data>(
      vertex => vertex.id === globId && { data: { name: 'Dupo' } },
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
    const createdVertex = await graph.createVertex(data);
    const deleteVertex = await graph.deleteVertex<typeof data>(
      vertex => vertex.id === createdVertex.id,
    );

    assert.equal(deleteVertex, true);
  });
});

describe('Links operations', () => {
  let createdVertexId: uuidType;

  async function createVertexAndArc() {
    createdVertexId = (await graph.createVertex(data)).id;
    return graph.createArc(globId, createdVertexId);
  }

  async function checkLinksPresence(
    vertexId: uuidType,
    arcId: uuidType,
    expected: boolean,
  ) {
    const foundVertex = await graph.findOne(vertex => vertex.id === vertexId);
    assert.equal(
      foundVertex.links.includes(arcId),
      expected,
      `Arc ${expected ? 'not ' : ''}found in vertex`,
    );
  }

  it('create an arc between two vertices', async () => {
    const newArcCreated = await createVertexAndArc();

    assert.equal(newArcCreated, true, 'Arc creation failed');
    await checkLinksPresence(globId, createdVertexId, true);
  });

  it('checks the existence of an arc between two vertices', async () => {
    const hasArc = await graph.hasArc(globId, createdVertexId);
    assert.equal(hasArc, true);
  });

  it('remove an arc between two vertices', async () => {
    await createVertexAndArc();
    const removedArc = await graph.removeArc(globId, createdVertexId);

    assert.equal(removedArc, true, 'Arc removal failed');
    await checkLinksPresence(globId, createdVertexId, false);
  });

  it('create edges between multiple vertices', async () => {
    const ids = await Promise.all([
      graph.createVertex({ name: 'Vertex 1' }),
      graph.createVertex({ name: 'Vertex 2' }),
      graph.createVertex({ name: 'Vertex 3' }),
      graph.createVertex({ name: 'Vertex 4' }),
      graph.createVertex({ name: 'Vertex 5' }),
    ]).then(results => results.map(result => result.id));

    const edgeCreated = await graph.createEdge(ids);
    assert.equal(edgeCreated, true, 'Edge creation failed');

    for (let i = 0; i < ids.length - 1; i++) {
      await checkLinksPresence(ids[i], ids[i + 1], true);
      await checkLinksPresence(ids[i + 1], ids[i], true);
    }
  });
});
