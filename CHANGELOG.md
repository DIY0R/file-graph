### Changelog

All notable changes to this project will be documented in this file. Dates are displayed in UTC.

#### [1.1.0](https://github.com/DIY0R/file-graph/compare/1.0.1...1.1.0)

- feat: add public removeEdge method [`ca1188e`](https://github.com/DIY0R/file-graph/commit/ca1188eace324c6a6d412ad65671be93c04f8639)
- doc: add section removeEdge function [`abd65dd`](https://github.com/DIY0R/file-graph/commit/abd65ddf545dc9c0091279431a65f86eafb2c479)
- test: add test for remove edge [`f668c49`](https://github.com/DIY0R/file-graph/commit/f668c49129295f756ec676656a355241428f234e)

#### [1.0.1](https://github.com/DIY0R/file-graph/compare/1.0.0...1.0.1)

> 25 September 2024

- fix: check all vertices exist [`b0653cf`](https://github.com/DIY0R/file-graph/commit/b0653cfbeba2a065d1bf354b4b06501800142328)
- fix: premature execution of updateLine before queue processing [`cad659a`](https://github.com/DIY0R/file-graph/commit/cad659a6e7b7bf671fcc67e493beffc8baabff9d)

### [1.0.0](https://github.com/DIY0R/file-graph/compare/0.12.1...1.0.0)

> 25 September 2024

- refactor: use absolute path [`efc7a18`](https://github.com/DIY0R/file-graph/commit/efc7a18438b48215c1cebab6a1c38a4bc5a643b1)

#### [0.12.1](https://github.com/DIY0R/file-graph/compare/0.12.0...0.12.1)

> 22 September 2024

- doc: improved documentation text and examples [`d234ab9`](https://github.com/DIY0R/file-graph/commit/d234ab9e1069af8b2bf4f26f5f97f1e894f52868)
- refactor: esModuleInterop true [`b0174d1`](https://github.com/DIY0R/file-graph/commit/b0174d1558eb52019d3dea98ef2743fc3cacb902)

#### [0.12.0](https://github.com/DIY0R/file-graph/compare/0.11.1...0.12.0)

> 19 September 2024

- doc: add installation [`2f28baa`](https://github.com/DIY0R/file-graph/commit/2f28baa1cf91745475b88745d70df5133ea911c2)
- refactor: refactor correct type exports [`0824d9d`](https://github.com/DIY0R/file-graph/commit/0824d9dd45e1158f9928b99bad2124b3e3eaaf36)
- test: add tests for findUpToLevel without maxLevel [`3601ddb`](https://github.com/DIY0R/file-graph/commit/3601ddbe2520e49208221ea4d7a7664217b1fda5)
- feat: make maxLevel optional in findUpToLevel [`def415d`](https://github.com/DIY0R/file-graph/commit/def415df812ac6ed89d069a4154bbc973a2b7336)
- doc: add intro [`5b7d752`](https://github.com/DIY0R/file-graph/commit/5b7d7524aa32e78261b50b591868f679c4e16f20)

#### [0.11.1](https://github.com/DIY0R/file-graph/compare/0.11.0...0.11.1)

> 12 September 2024

- fix: operation not permitted [`e82435e`](https://github.com/DIY0R/file-graph/commit/e82435ecad39fe519f82ddf50f9fce70bb4f86eb)
- test: add test for error if target vertex exists [`3522336`](https://github.com/DIY0R/file-graph/commit/35223369e1770871ea16f38445010d3096ce3aaf)

#### [0.11.0](https://github.com/DIY0R/file-graph/compare/0.10.0...0.11.0)

> 10 September 2024

- feat: add public searchVerticesFrom method [`953c782`](https://github.com/DIY0R/file-graph/commit/953c782ab795193c61d2cf294b3c5816201feba8)
- refactor(test): simplify vertex and arc creation logic [`f122d48`](https://github.com/DIY0R/file-graph/commit/f122d48991b2aa3e04ba1dfda765f8ca26b97075)
- test: add unit tests for searchVerticesFrom method [`fec47b5`](https://github.com/DIY0R/file-graph/commit/fec47b566fb05af04f6a9c972d5e2536e03e5754)
- refactor: change path checking method name to hasPath [`9c4424c`](https://github.com/DIY0R/file-graph/commit/9c4424ced3c2bb7de575e37803ed556245128655)

#### [0.10.0](https://github.com/DIY0R/file-graph/compare/0.9.1...0.10.0)

> 6 September 2024

- refactor: error handling by extracting messages [`673fd4d`](https://github.com/DIY0R/file-graph/commit/673fd4d368d467aa6c95398dc4c2e895227d8948)
- refactor(test): rewrite to test fn [`4dbf977`](https://github.com/DIY0R/file-graph/commit/4dbf977eb51eacfa1b49b55307e1b9ae7f4d9d93)
- feat: add public isConnected method [`6cf1e93`](https://github.com/DIY0R/file-graph/commit/6cf1e936f59b31a93188825fd4c42d45656942d1)
- feat: add public forEachVertex method [`99a2e97`](https://github.com/DIY0R/file-graph/commit/99a2e97260812254fade68fb47799b17b64795d0)
- test: add unit tests for isConnected  method [`ac0ae22`](https://github.com/DIY0R/file-graph/commit/ac0ae229b6a3e7f075a8bca513ec87eb817c09eb)

#### [0.9.1](https://github.com/DIY0R/file-graph/compare/0.9.0...0.9.1)

> 3 September 2024

- fix: add type to createArcs [`935e47e`](https://github.com/DIY0R/file-graph/commit/935e47ef91859c727999629d4d18092dd67cb307)
- refactor: remove tmp file before run tests [`a14d1a4`](https://github.com/DIY0R/file-graph/commit/a14d1a46266e302e299b4f2c76566949073570be)

#### [0.9.0](https://github.com/DIY0R/file-graph/compare/0.8.0...0.9.0)

> 3 September 2024

- feat: add public findUpToLevel method [`b528065`](https://github.com/DIY0R/file-graph/commit/b528065ffb083961104408d627be3fc6d5b42069)
- test: add unit tests for findUpToLevel method [`4728ec3`](https://github.com/DIY0R/file-graph/commit/4728ec32f3a44944178e6ee003a36d29aac66d53)
- test: add unit tests for createArcs method [`8256072`](https://github.com/DIY0R/file-graph/commit/82560727110238d975061b09f7ce8c39dcee3cbb)
- refactor: improve code readability [`e4aaf01`](https://github.com/DIY0R/file-graph/commit/e4aaf013ab02a4004f03b0a4a35f30cfa5c41c52)
- feat: add public createArcs method [`77ad981`](https://github.com/DIY0R/file-graph/commit/77ad9814dbefa4387b4349467e98f0fb224e6195)
- refactor(test): change to createVertices [`1d9bf72`](https://github.com/DIY0R/file-graph/commit/1d9bf72de19ac79b48b9f6645e937f0171eda49b)

#### [0.8.0](https://github.com/DIY0R/file-graph/compare/0.7.0...0.8.0)

> 30 August 2024

- feat: add public createEdge method [`6fb8851`](https://github.com/DIY0R/file-graph/commit/6fb88517fb392f0879e8b9fab7c13ca2cf8ad250)
- test: add unit test for createEdge method [`7a4d7df`](https://github.com/DIY0R/file-graph/commit/7a4d7df316c9be3329d337db78d575fb6c32e1e1)
- refactor: move type of lint function [`83a520f`](https://github.com/DIY0R/file-graph/commit/83a520fc282a74b57186fc4955254c644ab4e2a1)

#### [0.7.0](https://github.com/DIY0R/file-graph/compare/0.6.0...0.7.0)

> 27 August 2024

- feat: add public findAll method [`d237fa4`](https://github.com/DIY0R/file-graph/commit/d237fa4c87a2d216e7048a4a7e56898cd8e01290)
- test: add unit test for findAll method [`d0984ca`](https://github.com/DIY0R/file-graph/commit/d0984ca9b513273337522468907854c7d82cc3fc)
- test: skip length test [`b7c5842`](https://github.com/DIY0R/file-graph/commit/b7c5842e863de47443d8fcdbaf3a6259c6e56240)

#### [0.6.0](https://github.com/DIY0R/file-graph/compare/0.5.2...0.6.0)

> 23 August 2024

- style: logical arrangement of methods [`48b0d0e`](https://github.com/DIY0R/file-graph/commit/48b0d0ebb83c5e60979842efcf519b6ecd6d7eff)
- feat: add public createVertices method [`c744ade`](https://github.com/DIY0R/file-graph/commit/c744adeb7b7991231b744d1b0f10a6df3d25883a)
- refactor: transition to async/await syntax [`4bb6178`](https://github.com/DIY0R/file-graph/commit/4bb61782a0f99667fd72b0e717d601942635d835)
- test: creates multiple vertices [`f972898`](https://github.com/DIY0R/file-graph/commit/f972898eb275cb529a6f71cf43f46b3164fc482a)

#### [0.5.2](https://github.com/DIY0R/file-graph/compare/0.5.1...0.5.2)

> 20 August 2024

- perf: return the created vertex object [`18f96ee`](https://github.com/DIY0R/file-graph/commit/18f96ee8425a5184463c93de3ac95a9096e114de)
- Merge pull request #21 from DIY0R/dependabot/npm_and_yarn/typescript-eslint-8.2.0 [`2aa095d`](https://github.com/DIY0R/file-graph/commit/2aa095dda4078ff8996e7992df6666d7ce2ca45a)

#### [0.5.1](https://github.com/DIY0R/file-graph/compare/0.5.0...0.5.1)

> 19 August 2024

- fix: update JSDoc for hasArc method [`35f2b07`](https://github.com/DIY0R/file-graph/commit/35f2b07205cdc2421a5d8e36e0a8d285fcdad21d)

#### [0.5.0](https://github.com/DIY0R/file-graph/compare/0.4.0...0.5.0)

> 19 August 2024

- feat: add public hasArc method [`6c41f68`](https://github.com/DIY0R/file-graph/commit/6c41f68305fe24aac87a4ea6789392a530b598b9)
- test: check existence of arc between two vertices [`b30ed79`](https://github.com/DIY0R/file-graph/commit/b30ed799b39b5db9ae75576518adebb64c458e15)

#### [0.4.0](https://github.com/DIY0R/file-graph/compare/0.0.1...0.4.0)

> 18 August 2024

- test: set up tests [`845a7cb`](https://github.com/DIY0R/file-graph/commit/845a7cb3b6cc7aafeba1ab1da5e19df92ccb1e97)
- feat(lib): add public method updateVertex [`2fac83d`](https://github.com/DIY0R/file-graph/commit/2fac83dd7aff0b09bf022896a7663c03eb345bd3)
- feat: add public createArc method [`0f3396e`](https://github.com/DIY0R/file-graph/commit/0f3396e1d11e8912f2ccf269914217058809d0b5)
- feat(lib): create vertex and find [`0133268`](https://github.com/DIY0R/file-graph/commit/0133268bf94f469bea87960dc27c0fcb7af94ee6)
- feat: add public removeArc method [`9ce32d0`](https://github.com/DIY0R/file-graph/commit/9ce32d0c93b244d557c93a05e6110865b7e670d6)
- refactor: add data attribute in vertex [`6b3ae4e`](https://github.com/DIY0R/file-graph/commit/6b3ae4e163862f9e61a51a4c6daaf8527404cfd9)
- feat(lib): add public method deleteVertex [`721ec66`](https://github.com/DIY0R/file-graph/commit/721ec6606cd3cc2c9dc9a801ecb449dd634c356e)
- perf(lib): pass findOne method predicate fn [`1d69dfd`](https://github.com/DIY0R/file-graph/commit/1d69dfddfbd7120de822d42364e300db9f331387)
- test: add unit tests removeArc method [`32da87b`](https://github.com/DIY0R/file-graph/commit/32da87b345f6ccb11eac0174239315dd25071b5a)
- style(test):  better readability and accuracy [`93164d9`](https://github.com/DIY0R/file-graph/commit/93164d9fd1de2929a7054e37d33337c39c182093)
- test: check updated vertex [`729472a`](https://github.com/DIY0R/file-graph/commit/729472ace5f71d3004d11f8af86d0b41a900362c)
- perf: added async task queue support for file operations [`d37a916`](https://github.com/DIY0R/file-graph/commit/d37a916c4528340d00ad41c04980a100f15c54f4)
- test: create an arc between two vertice [`2d13779`](https://github.com/DIY0R/file-graph/commit/2d137795dd0d8f2e47169439bac86b65270c6287)
- fix(lib): duplicate calls close stream [`a373cf3`](https://github.com/DIY0R/file-graph/commit/a373cf3f9829b356d66213c598836c53c50443c8)
- refactor: update jsdoc [`89ac152`](https://github.com/DIY0R/file-graph/commit/89ac152744b2e2eb7eb03177b3623740991d3496)
- test: check deleted vertex [`1af21cc`](https://github.com/DIY0R/file-graph/commit/1af21cc40df565f2a7681d59a1140846bd084582)
- perf(test): create Vertex and findOne [`4763523`](https://github.com/DIY0R/file-graph/commit/476352396eaafba5b5c0d2e79ab253650f85ba5d)
- refactor(lib): define callback function type [`18ee580`](https://github.com/DIY0R/file-graph/commit/18ee5802143e56254a4d7b495e9418c1d41facec)
- fix(lib): uniq temp file [`25841c5`](https://github.com/DIY0R/file-graph/commit/25841c5ac8b3fbf62e54d762003301276240a0af)

#### 0.0.1

> 6 August 2024
