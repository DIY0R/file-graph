import { FileGraph } from 'lib';
import assert from 'node:assert';

import test from 'node:test';
const graph = FileGraph('./data.txt');
test('create node and findById', async t => {
  const model = { name: 'Dyor', age: new Date().toString() };
  const id = await graph.createVertex(model);
  const finModel = await graph.findById(id);
  assert.deepStrictEqual(finModel[id], model);
});
