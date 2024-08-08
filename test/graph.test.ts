import { FileGraph } from 'lib';
import assert from 'node:assert';

import test from 'node:test';
const graph = FileGraph('./data.txt');
test('create Vertex and findOne', async t => {
  const model = { name: 'Dyor', age: new Date().toString() };
  const id = await graph.createVertex(model);
  const finModel = await graph.findOne<typeof model>(model => model.id == id);
  console.log(finModel);
  assert.deepStrictEqual({ id, ...model }, finModel);
});
