import assert from 'node:assert';
import { describe, it } from 'node:test';
import { FileGraph, IUuidArray, uuidType } from 'lib';

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
    const createVertices = await graph.createVertices([
      { name: 'Vertex 1' },
      { name: 'Vertex 2' },
      { name: 'Vertex 3' },
    ]);

    const ids = createVertices.map(result => result.id) as IUuidArray;
    const edgeCreated = await graph.createEdge(ids);

    assert.equal(edgeCreated, true, 'Edge creation failed');

    for (let i = 0; i < ids.length - 1; i++) {
      await checkLinksPresence(ids[i], ids[i + 1], true);
      await checkLinksPresence(ids[i + 1], ids[i], true);
    }
  });
  it('create arcs between multiple vertices', async () => {
    const createVertices = await graph.createVertices([
      { name: 'Vertex 1' },
      { name: 'Vertex 2' },
      { name: 'Vertex 3' },
    ]);

    const ids = createVertices.map(result => result.id) as IUuidArray;
    const edgeCreated = await graph.createArcs(ids);

    assert.equal(edgeCreated, true, 'Edge creation failed');

    for (let i = 0; i < ids.length - 1; i++)
      await checkLinksPresence(ids[i], ids[i + 1], true);
  });
  it('retrieve all vertices up to the specified depth level in a graph', async () => {
    const createVertices = await graph.createVertices([
      { name: 'Vertex 1' },
      { name: 'Vertex 2' },
      { name: 'Vertex 3' },
    ]);
    const ids = createVertices.map(result => result.id) as IUuidArray;
    await graph.createArcs(ids);
    const graphTree = await graph.findUpToLevel(createVertices[0].id, 2);
    assert.equal(graphTree.length, 3);
    graphTree.forEach((vertex, index) => {
      assert.equal(vertex.level, index);
      assert.equal(vertex.id, ids[index]);
    });
  });
  it('error for negative level', async () => {
    try {
      await graph.findUpToLevel('A' as uuidType, -1);
      assert.fail('Expected error not thrown');
    } catch (error) {
      assert.strictEqual(
        error.message,
        'Level must be a non-negative integer.',
      );
    }
  });

  it('error if start vertex does not exist', async () => {
    try {
      await graph.findUpToLevel('NonExistentVertex' as uuidType, 1);
      assert.fail('Expected error not thrown');
    } catch (error) {
      assert.strictEqual(
        error.message,
        'Vertex with id NonExistentVertex not found.',
      );
    }
  });
});
