import assert from 'node:assert';
import { describe, it } from 'node:test';
import { FileGraph } from 'lib';

const graph = FileGraph('./data.txt');
const myVertex = { name: 'Diy0r', age: new Date().toString() };
let globId = '6c5febc1-161b-46c7-abf6-b20088fd410e';
describe('CRUD', t => {
  it('create Vertex and findOne', async t => {
    const createdVertexId = await graph.createVertex(myVertex);
    const findVertex = await graph.findOne<typeof myVertex>(
      vertex => vertex.id == createdVertexId,
    );
    assert.deepStrictEqual({ id: createdVertexId, ...myVertex }, findVertex);
    globId = findVertex.id;
  });
  it('update Vertex', async t => {
    const isUpdate = await graph.updateVertex<typeof myVertex>(model =>
      model.id == globId ? { name: 'Dupo', id: '121212', sdsds: 'sdsd' } : null,
    );
    assert.equal(isUpdate, true);
  });

  it('check updated vertex name', async t => {
    const findVertex = await graph.findOne<typeof myVertex>(
      vertex => vertex.id == globId,
    );
    assert.deepStrictEqual(findVertex.name, 'Dupo');
  });
});
