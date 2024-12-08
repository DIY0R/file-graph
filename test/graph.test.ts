import assert from 'node:assert';
import { before, describe, test } from 'node:test';
import { FileGraph, IUuidArray, uuidType } from '../lib';
import { writeFileSync } from 'node:fs';
import { createError } from '../lib/utils';
import { tmpdir } from 'os';
import { join } from 'node:path';

describe('file-graph', () => {
  const data = { name: 'Diy0r', age: new Date().toString() };
  let globId = '' as uuidType;
  const pathGraph = join(tmpdir(), 'data.txt');
  const graph = FileGraph(pathGraph);

  before(() => {
    writeFileSync(pathGraph, '');
  });

  describe('Vertex CRUD Operations', () => {
    test('create a vertex and find test by ID', async () => {
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

    test('creates multiple vertices', async () => {
      const vertices = [{ name: 'Alex' }, { city: 'LA' }];
      const createdVertices = await graph.createVertices(vertices);
      assert.strictEqual(createdVertices.length, vertices.length);
      createdVertices.forEach((vertex, index) =>
        assert.deepEqual(vertex.data, vertices[index]),
      );
    });

    test('find all vertices matching a predicate', async () => {
      const vertices = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Alice' }];
      await graph.createVertices(vertices);
      const foundVertices = await graph.findAll<any>(
        vertex => vertex.data?.name === 'Alice',
      );
      foundVertices.forEach(vertex =>
        assert.strictEqual(vertex.data.name, 'Alice'),
      );
    });

    test('update the vertex name', async () => {
      const isUpdated = await graph.updateVertex<typeof data>(
        vertex => vertex.id === globId && { data: { name: 'Dupe' } },
      );
      assert.strictEqual(isUpdated, true);
    });

    test('verify the updated vertex name', async () => {
      const foundVertex = await graph.findOne<typeof data>(
        vertex => vertex.id === globId,
      );
      assert.strictEqual(foundVertex?.data.name, 'Dupe');
    });

    test('create a vertex and delete test', async () => {
      const createdVertex = await graph.createVertex(data);
      const deleteVertex = await graph.deleteVertex<typeof data>(
        vertex => vertex.id === createdVertex.id,
      );
      assert.equal(deleteVertex, true);
    });
  });

  describe('Links operations', () => {
    async function createArcGlobalId(vId = globId) {
      const createdVertexId = (await graph.createVertex(data)).id;
      await graph.createArc(vId, createdVertexId);
      return createdVertexId;
    }

    async function createVertexArcs(length: number) {
      const vertices = Array.from({ length }, (_, i) => ({
        name: `V-${i}`,
        num: i + 1,
      }));
      const createVertices = await graph.createVertices(vertices);
      const ids = createVertices.map(result => result.id) as IUuidArray;
      await graph.createArcs(ids);
      return { ids, vertices: createVertices };
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

    test('create an arc between two vertices', async () => {
      const newArcCreated = await createArcGlobalId();
      await checkLinksPresence(globId, newArcCreated, true);
    });

    test('error if target vertex already exists in vertex', async () => {
      const { id: vId } = await graph.createVertex(data);

      const newArcCreated = await createArcGlobalId(vId);
      try {
        await graph.createArc(vId, newArcCreated);
      } catch (error) {
        assert.strictEqual(
          error.message,
          createError('TARGET_VERTEX_ALREADY_EXISTS', newArcCreated, vId)
            .message,
        );
      }
    });

    test('remove an arc between two vertices', async () => {
      const newArcCreatedId = await createArcGlobalId();
      const removedArc = await graph.removeArc(globId, newArcCreatedId);
      assert.equal(removedArc, true, 'Arc removal failed');
      await checkLinksPresence(globId, newArcCreatedId, false);
    });

    test('create edges between multiple vertices', async () => {
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

    test('throw error if not all vertices exist when creating an edge', async () => {
      try {
        const newVertex = await graph.createVertex({ name: 'Vertex 1' });
        await graph.createEdge([newVertex.id, 'iID' as uuidType]);
      } catch (error) {
        assert.strictEqual(
          error.message,
          createError('MISSING_TRANSMITTED_VERTICES').message,
        );
      }
    });

    test('remove edges between multiple vertices', async () => {
      const createVertices = await graph.createVertices([
        { name: 'Vertex 1' },
        { name: 'Vertex 2' },
        { name: 'Vertex 3' },
      ]);
      const ids = createVertices.map(result => result.id) as IUuidArray;
      await graph.createEdge(ids);
      const edgeRemoved = await graph.removeEdge(ids);
      assert.equal(edgeRemoved, true, 'Edge remove failed');
      for (let i = 0; i < ids.length - 1; i++) {
        await checkLinksPresence(ids[i], ids[i + 1], false);
        await checkLinksPresence(ids[i + 1], ids[i], false);
      }
    });

    test('create arcs between multiple vertices', async () => {
      const { ids } = await createVertexArcs(12);
      for (let i = 0; i < ids.length - 1; i++)
        await checkLinksPresence(ids[i], ids[i + 1], true);
    });

    test('throw error if not all vertices exist when creating an arcs', async () => {
      try {
        const newVertex = await graph.createVertex({ name: 'Vertex 1' });
        await graph.createArcs([newVertex.id, 'iID' as uuidType]);
      } catch (error) {
        assert.strictEqual(
          error.message,
          createError('MISSING_TRANSMITTED_VERTICES').message,
        );
      }
    });

    test('retrieve all vertices up to the specified depth level', async () => {
      const count = 30;
      const { ids, vertices } = await createVertexArcs(count);
      const graphTree = await graph.findUpToLevel(vertices[0].id, count - 4);
      assert.equal(graphTree.length, count - 3);
      graphTree.forEach((vertex, index) => {
        assert.equal(vertex.level, index);
        assert.equal(vertex.id, ids[index]);
      });
    });

    test('retrieve all extract all vertices', async () => {
      const count = 15;
      const { ids, vertices } = await createVertexArcs(count);
      const graphTree = await graph.findUpToLevel(vertices[0].id);
      assert.equal(graphTree.length, count);
      graphTree.forEach((vertex, index) => {
        assert.equal(vertex.level, index);
        assert.equal(vertex.id, ids[index]);
      });
    });

    test('error for negative level', async () => {
      try {
        await graph.findUpToLevel('A' as uuidType, -1);
        assert.fail('Expected error not thrown');
      } catch (error) {
        assert.strictEqual(
          error.message,
          createError('NEGATIVE_LEVEL').message,
        );
      }
    });

    test('error if start vertex does not exist', async () => {
      try {
        await graph.findUpToLevel('NonExistentVertex' as uuidType, 1);
        assert.fail('Expected error not thrown');
      } catch (error) {
        assert.strictEqual(
          error.message,
          createError('VERTEX_NOT_FOUND', 'NonExistentVertex').message,
        );
      }
    });

    test('check if two vertices are connected', async () => {
      const { ids } = await createVertexArcs(30);
      const result = await graph.hasPath(ids[0], ids.at(-10));
      assert.equal(result, true);
    });

    test('vertices that match the predicate', async () => {
      const countVertex = 30;
      const { ids } = await createVertexArcs(countVertex);
      const check = v => v.data.num % 2 === 0;
      const result = await graph.searchVerticesFrom<{ num: number }>(
        ids[0],
        check,
      );
      result.forEach(vertex => assert.equal(check(vertex), true));
      assert.equal(result.length, countVertex / 2);
    });
  });
});
